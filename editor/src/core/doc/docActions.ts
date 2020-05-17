import { 
    ElementAddAction, ElementUpdateAction, ElementMoveAction, ElementRemoveAction, DocActionSet,
    ComponentUri, 
    ElementProps, 
    ElementLocation, 
    DocAction, 
    ComponentRenameAction,
    ComponentAddAction} from "./docModels"

export const docActionSet = (actions:DocAction[]):DocActionSet => ({
    type: "ACTION_SET",
    actions
})

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

export const docComponentAdd = (name: string):ComponentAddAction => ({
    type: "COMPONENT_ADD",
    name
})

export const docComponentRename = (oldName: string, newName: string):ComponentRenameAction => ({
    type: "COMPONENT_RENAME",
    oldName,
    newName
})