import { ComponentUri, PropsMap } from "./doc/docModels";
import { DocAction } from "./doc/state/actionModels";

export type ComponentDraggable = {
    type: "component"
    uri: ComponentUri
    props: PropsMap
}

export type ElementDraggable = {
    type: "element"
    component: string
    id: string
}

export type DragActionFactory = (item:Draggable, component: string, elementId: string) => DocAction

export type Draggable = ComponentDraggable | ElementDraggable;

