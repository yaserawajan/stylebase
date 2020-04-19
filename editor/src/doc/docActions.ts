import { ElementAddAction, ElementUpdateAction, ElementMoveAction, ElementRemoveAction, ComponentUri, ElementProps, ElementLocation } from "./docModels"

export const docElementAdd = (
    elementType: ComponentUri, 
    props: ElementProps, 
    location: ElementLocation,
    ):ElementAddAction => ({
        type: "ELEMENT_ADD",
        elementType,
        props,
        location
    })

export const docElementUpdate = (component: string, elementId: string, props: ElementProps):ElementUpdateAction => ({
        type: "ELEMENT_UPDATE",
        component,
        elementId,
        props
    })

export const docElementMove = (
    fromComponent: string, 
    fromElementId: string, 
    location: ElementLocation
    ):ElementMoveAction => ({
        type: "ELEMENT_MOVE",
        fromComponent,
        fromElementId,
        location
    })

export const docElementRemove = (component: string, elementId: string):ElementRemoveAction => ({
    type: "ELEMENT_REMOVE",
    component,
    elementId
})