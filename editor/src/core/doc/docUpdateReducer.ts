import { DocSnapshot } from "../../patterns/docEditor/docEditorState";
import { DocState, DocSelection, DocAction, ComponentState, ElementLocation, ElementDesc, ComponentUri, ComponentMetadata } from "./docModels";
import { entitySetUpdate, entitySetAdd } from "../../patterns/entitySet/entitySetUtils";
import { EntitySet } from "../../patterns/entitySet/entitySetModels";
import { newId } from "./newId";

const findAncestors = (state: ComponentState, el: string):string[] => {
    const elements = state.elements;
    const elData = elements.byName[el];
    if (!elData) return [];

    let elParent:string = null;
    for (const kEl in elements.byName) { 
        const elTested = elements.byName[kEl];
        if (elTested.props.children && elTested.props.children.indexOf(el) !== -1) {
            elParent = kEl;
            break;
        }
    }

    if (!elParent) return [];

    return [elParent, ...findAncestors(state, elParent)];
}

const findDescendents = (state: ComponentState, el: string):string[] => {
    const elData = state.elements.byName[el];
    if (!elData) return []; 
    const children:string[] = elData.props.children || [];
    return [].concat.apply([el], children.map(c => findDescendents(state, c)));
} 

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

export const createDocUpdateReducer = (componentWithRoot: ComponentMetadata) => {

    const componentStateZero:ComponentState = {
        defaultProps: componentWithRoot.defaultProps,
        rootElement: componentWithRoot.rootElement,
        elements: {
            all: Object.keys(componentWithRoot.elements),
            byName: componentWithRoot.elements
        },
        propTypes: {
            all: Object.keys(componentWithRoot.propTypes),
            byName: componentWithRoot.propTypes
        }
    }

    const reducer = (state:DocSnapshot<DocState, DocSelection>, action: DocAction): DocSnapshot<DocState, DocSelection> => {

        if (action.type == "ACTION_SET") {
            let newState = state;
            action.actions.forEach(a => {
                newState = reducer(newState, a);
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
            
            const componentState = state.data.components.byName[action.location.component];

            const idPrefix = action.elementType.component;
            const generatedId = newId(idPrefix, componentState.elements.all);

            const components = entitySetUpdate(
                    state.data.components, 
                    action.location.component, 
                    addElement(componentState, generatedId, { type: action.elementType, props: action.props }, action.location));

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
                    elements: [ generatedId ]
                }
            }
        }

        if (action.type == "ELEMENT_MOVE") {
            
            const sameComponent = action.fromComponent == action.location.component
    
            const componentFromOld = state.data.components.byName[action.fromComponent]
            const componentFrom = removeElement(componentFromOld, action.fromElementId);
            
            const element = componentFromOld.elements.byName[action.fromElementId];


            const componentToOld = sameComponent
                ? componentFrom
                : state.data.components.byName[action.location.component];
            
            const id = sameComponent
                ? action.fromElementId
                : newId(element.type.component, componentToOld.elements.all)

            const componentTo = addElement(componentToOld, id, element, action.location);
            
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

        }

        if (action.type == "ELEMENT_REMOVE") {
            const compState = state.data.components.byName[action.component];
            const elTree = findDescendents(compState, action.elementId);

            if (elTree.length < 1) return state;

            const [ parent, ..._ ] = findAncestors(compState, action.elementId);
            
            let byName:any = {}
            for (const kEl in compState.elements.byName) {
                if (elTree.indexOf(kEl) === -1) {
                    const elData = compState.elements.byName[kEl];
                    if (parent == kEl) {
                        byName[kEl] = {
                            ...elData,
                            props: {
                                ...elData.props,
                                children: elData.props.children.filter((c:string) => c != action.elementId)
                            }
                        }
                    }
                    else {
                        byName[kEl] = elData;
                    }
                    
                }
            }

            return {
                ...state,
                selection: {
                    ...state.selection,
                    elements: [ parent ]
                },
                data: {
                    ...state.data,
                    components: {
                        ...state.data.components,
                        byName: {
                            ...state.data.components.byName,
                            [action.component]: {
                                ...compState,
                                elements: {
                                    all: Object.keys(byName),
                                    byName
                                }
                            }
                        }
                    }
                }
            }
        }

        if (action.type == "COMPONENT_ADD") {
            
            return {
                ...state,
                data: {
                    ...state.data,
                    components: entitySetAdd(state.data.components, action.name, componentStateZero)
                },
                selection: {
                    component: action.name,
                    elements: [ componentStateZero.rootElement ]
                }
            }

        }

        if (action.type == "COMPONENT_RENAME") {

            const all = state.data.components.all.map(n => 
                n == action.oldName 
                    ? action.newName 
                    : n);
                
            const { [action.oldName]: def, ...componentsByNameOld } = state.data.components.byName;

            let componentsByName:any = {};
            for (const k in componentsByNameOld) {
                const c = componentsByNameOld[k];
                let elementsByName:any = {}
                for (const kEl in c.elements.byName) {
                    const el = c.elements.byName[kEl];
                    if (!el.type.lib && el.type.component == action.oldName) {
                        elementsByName[kEl] = {
                            ...el,
                            type: { component: action.newName }
                        }
                    }
                    else {
                        elementsByName[kEl] = el;
                    }
                }
                componentsByName[k] = {
                    ...c,
                    elements: {
                        ...c.elements,
                        byName: elementsByName
                    }
                }
            }

            const byName = { ...componentsByName, [action.newName]: def };
            const selectedComponent = state.selection.component == action.oldName
                ? action.newName
                : action.oldName;

            return {
                ...state,
                data: {
                    ...state.data,
                    components: { ...state.data.components, all, byName }
                },
                selection: {
                    ...state.selection,
                    component: selectedComponent
                }
            }
        }



        return state;
    }

    return reducer;

}