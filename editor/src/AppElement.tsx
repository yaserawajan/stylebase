import * as React from "react";

import { ComponentFactory, DocAction, ElementAddAction, Location, ElementMoveAction } from "./doc/docModels";
import { useDocElementState } from "./doc/docHooks";
import { ViewElement } from "./canvas/ViewElement";
import { useDraggableAsset } from "./uiState/useDraggableAsset";
import { useViewDropTarget } from "./uiState/useViewDropTarget";
import { useDispatch } from "react-redux";
import { dragEnd } from "./uiState/ideState";
import { actionUpdate } from "./docEditor/docEditorState";

const combineRefs = (...refs:any[]) => (value:any) => {
    refs.forEach(ref => {
        if (!ref) return;
        if (typeof ref === 'function') ref(value)
        else ref.current = value;
    });
}

interface Props {
    component: string
    elementId: string
    parentElementId?: string
    componentFactory: ComponentFactory
    onClick: (id:string) => void
    onHover: (id:string) => void
}

export const AppElement = (props:Props) => {
    const element = useDocElementState(props.component, props.elementId);
    const dispatch = useDispatch();

    const drag = useDraggableAsset({
        type: "element",
        id: props.elementId,
        component: props.component
    });

    const drop = useViewDropTarget({
        accept: ["component", "element"],
        component: props.component,
        elementId: props.elementId,
        actionTypeResolver: (item, g) => {
            
            if (item.type == "element" && 
                item.id == props.elementId && 
                item.component == props.component) return undefined;

            if (props.parentElementId) {

                const xMin = Math.floor(g.containerWidth * 0.1);
                const yMin = Math.floor(g.containerHeight * 0.1);
                if (g.offsetX < xMin || g.offsetY < yMin) return "before";
                
                const xMax = g.containerWidth - xMin;
                const yMax = g.containerHeight - yMin;
                if (g.offsetX >= xMax || g.offsetY >= yMax) return "after";
            
            }

            return "in";
            
        },
        onDrop: ({ actionType, item }) => {
            
            dispatch(dragEnd());

            if (!actionType) return;

            let location:Location = null;
            if (actionType == "before") {
                location = { 
                    component: props.component, 
                    containerElement: props.parentElementId,
                    before: props.elementId 
                }
            }
            else if (actionType == "in") {
                location = {
                    component: props.component,
                    containerElement: props.elementId
                }
            }
            else {
                location = {
                    component: props.component,
                    containerElement: props.parentElementId,
                    after: props.elementId
                }
            }

            let docAction:DocAction = null;
            if (item.type == "element") {
                docAction = {
                    type: "ELEMENT_MOVE",
                    fromComponent: props.component,
                    fromElementId: props.elementId,
                    location
                } as ElementMoveAction
            }

            else if (item.type == "component") {
                docAction = {
                    type: "ELEMENT_ADD",
                    elementType: item.uri,
                    props: item.props,
                    location
                } as ElementAddAction
            }

            dispatch(actionUpdate(docAction));


        }
    });

    const { children = [], ...otherProps } = element.props;
    const C = props.componentFactory(element.type) as any;
    return (
        <ViewElement 
            elementId={props.elementId} 
            mute={element.isPreview}
            onClick={props.onClick} 
            onHover={props.onHover}>
            {({ ref }) => (
                <C {...otherProps} 
                    ref={combineRefs(ref, drag, drop)} 
                    children={children.map((child:string) => (
                        <AppElement 
                            key={child}
                            component={props.component}
                            onClick={props.onClick}
                            onHover={props.onHover}
                            elementId={child} 
                            parentElementId={props.elementId}
                            componentFactory={props.componentFactory} />
                    ))} />
            )}
        </ViewElement>
        );
}