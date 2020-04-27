import { DocSnapshot } from "../docEditor/docEditorState";
import { DocState, DocSelection, DocAction, ComponentState, ElementLocation, ElementDesc, ComponentUri } from "./docModels";
import { entitySetUpdate, entitySetAdd } from "../entitySet/entitySetUtils";
import { EntitySet } from "../entitySet/entitySetModels";


const purgeImports = (components:EntitySet<ComponentState>):string[] => {
    let unique:any = { }
    for (const k in components.byName) {
        const elements = components.byName[k].elements.byName;
        for (const kElement in elements) {
            const e = elements[kElement];
            if (e.type.lib) unique[e.type.lib] = true;
        }
    }
    return Object.keys(unique);
}

const insertBefore = (children:string[] = [], newId: string, anchor?: string):string[] => {
    let aNew:string[] = [];
    children.forEach(c => {
        if (c == anchor) aNew.push(newId);
        aNew.push(c);
    });
    return aNew;
} 

const insertAfter = (children:string[] = [], newId: string, anchor?: string):string[] => {
    let aNew:string[] = [];
    children.forEach(c => {
        aNew.push(c);
        if (c == anchor) aNew.push(newId);
    });
    return aNew;
} 

const insertLast = (children:string[] = [], newId: string):string[] => [...children, newId];

const insertChild = (children:string[] = [], newId: string, location: ElementLocation):string[] => {
    return ("before" in location)
    ? insertBefore(children, newId, location.before) 
    : (("after" in location)
        ? insertAfter(children, newId, location.after)
        : insertLast(children, newId)) 
}

const removeFromArray = (children:string[], child:string) => children.filter(c => c != child);

const addElement = (componentState: ComponentState, id: string, desc: ElementDesc, location: ElementLocation) => {
    const containerState = componentState.elements.byName[location.containerElement];
    return {
        ...componentState,
        elements: entitySetUpdate(entitySetAdd(componentState.elements, id, {
            type: desc.type,
            props: desc.props
        }), location.containerElement, {
                props: {
                    ...containerState.props,
                    children: insertChild(containerState.props.children, id, location)
                }
            })
    };
}

const removeElement = (componentState: ComponentState, id: string):ComponentState => {
    let containerId = null;
    for (const k in componentState.elements.byName) {
        const c = componentState.elements.byName[k];
        if (c.props.children.indexOf(id) != -1) {
            containerId = k;
            break;
        }
    }
    if (!containerId) return componentState;

    const container = componentState.elements.byName[containerId];

    const { [id]:_, ...otherElements } = componentState.elements.byName;
    return {
        ...componentState,
        elements: {
            all: removeFromArray(componentState.elements.all, id),
            byName: {
                ...otherElements,
                [containerId]: {
                    ...container,
                    props: {
                        ...container.props,
                        children: removeFromArray(container.props.children, id)
                    }
                }
            }
        }
    };
}

const createId = (componentState: ComponentState, type: ComponentUri):[string,ComponentState] => {
    const newCount = (componentState.namedCounters[type.component] || 0) + 1;
    const newId = `${type.component.toLocaleLowerCase()}-${newCount}`;
    return [ 
        newId,
        {
            ...componentState,
            namedCounters: {
                ...componentState.namedCounters,
                [type.component]: newCount
            }
        } 
    ]
}

export const docUpdateReducer = (state:DocSnapshot<DocState, DocSelection>, action: DocAction)
    : DocSnapshot<DocState, DocSelection> => {

    if (action.type == "ACTION_SET") {
        let newState = state;
        action.actions.forEach(a => {
            newState = docUpdateReducer(newState, a);
        })
        return newState;
    }

    if (action.type == "ELEMENT_UPDATE") {
        
        const componentState = state.data.components.byName[action.component];
        const oldProps = componentState.elements.byName[action.elementId].props;
        return {
            ...state,
            data: {
                ...state.data,
                components: {
                    ...state.data.components,
                    byName: {
                        ...state.data.components.byName,
                        [action.component]: {
                            ...componentState,
                            elements: entitySetUpdate(componentState.elements, 
                                action.elementId, 
                                { 
                                    props: {
                                        ...oldProps,
                                        ...action.props
                                    }
                                })
                        }
                    }
                }
            }
        }
    }

    if (action.type == "ELEMENT_ADD") {
        
        const [ newId, componentState ] = createId(state.data.components.byName[action.location.component], action.elementType);

        const components = entitySetUpdate(
                state.data.components, 
                action.location.component, 
                addElement(componentState, newId, { type: action.elementType, props: action.props }, action.location));

        return {
            ...state,
            data: {
                ...state.data,
                components,
                imports: purgeImports(components) 
            },
            selection: {
                ...state.selection,
                component: action.location.component,
                elements: [ newId ]
            }
        }
    }

    if (action.type == "ELEMENT_MOVE") {
        
        const sameComponent = action.fromComponent == action.location.component

        const componentFromOld = state.data.components.byName[action.fromComponent]
        const componentFrom = removeElement(componentFromOld, action.fromElementId);
        
        const element = componentFromOld.elements.byName[action.fromElementId];


        const componentToOld_ = sameComponent
            ? componentFrom
            : state.data.components.byName[action.location.component];
        const [ newId, componentToOld ] = sameComponent
            ? [ action.fromElementId, componentToOld_ ]
            : createId(componentToOld_, element.type);
        
        
        const componentTo = addElement(componentToOld, newId, element, action.location);
        
        return {
            ...state,
            data: {
                ...state.data,
                components: {
                    ...state.data.components,
                    byName: {
                        ...state.data.components.byName,
                        [action.fromComponent]: componentFrom,
                        [action.location.component]: componentTo
                    }
                }
            }
        }

        //const newId = action.fromComponent == action.location.component? action.fromElementId : 

        // return {
        //     ...state,
        //     data: {
        //         ...state.data,
        //         components: {
        //             ...state.data.components,
        //             byName
        //         }
        //     },
        //     selection: {
        //         ...state.selection,
        //         component: action.location.component,
        //         elements: [ action.fromElementId ]
        //     }
        // }
    }



    return state;
}