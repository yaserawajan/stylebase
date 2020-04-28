import { ComponentUri, DocAction, PropsMap } from "./core/doc/docModels";

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

