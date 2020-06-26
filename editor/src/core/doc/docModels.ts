

export type ComponentStateMapMetadata = {
    [state:string]: (props:any) => boolean
}

export type PropsMap = {
    [name:string]: any
}

export type ElementDesc = {
    type: ComponentUri
    props: PropsMap
}

export type ComponentMetadata = {

    rootElement: string
    elements: {
        [name:string]: ElementDesc
    }
    propTypes: PropMapMetadata
    defaultProps: PropsMap
}

export type ComponentUri = {
    lib?: string,
    component: string,
    version?: string
}

type EssentialProps = {

}

export type ComponentFactory = (uri: ComponentUri) => React.ComponentType<EssentialProps>;

export type DocFormat = {
    imports: string[]
    components: {
        [name: string]: ComponentMetadata
    }
}


// STATE



import { EntitySet } from "../../patterns/entitySet/entitySetModels"
import { PropMapMetadata, PropMetadata } from "./dataTypes/models"

export type DocSelection = {
    component: string
    elements: string[]
}


export type ElementProps = {
    [name:string]: any
}


export type ComponentMetadataState = {
    props: EntitySet<PropMetadata>
}

export type ComponentState = {
    propTypes: EntitySet<PropMetadata> 
    defaultProps: PropsMap
    rootElement: string
    elements: EntitySet<ElementDesc>
    
}

export type DocState = {
    //title: string
    components: EntitySet<ComponentState>
    imports: string[]
}

type LocationBefore = {
    component: string
    containerElement: string
    before?: string
}

type LocationAfter = {
    component: string
    containerElement: string
    after?: string
}

export type ElementLocation = LocationBefore | LocationAfter;

export type ElementAddAction = {
    type: "ELEMENT_ADD"
    elementType: ComponentUri
    props: ElementProps 
    location: ElementLocation
}

export type ElementMoveAction = {
    type: "ELEMENT_MOVE"
    fromComponent: string
    fromElementId: string
    location: ElementLocation
}

export type ElementRemoveAction = {
    type: "ELEMENT_REMOVE",
    component: string
    elementId: string
}


export type ElementUpdateAction = {
    type: "ELEMENT_UPDATE",
    component: string
    elementId: string,
    props: ElementProps
}

export type ComponentAddAction = {
    type: "COMPONENT_ADD"
    name: string
}

export type ComponentRenameAction = {
    type: "COMPONENT_RENAME",
    oldName: string,
    newName: string
}

export type ComponentParamAddAction = {
    type: "COMPONENT_PARAM_ADD",
    component: string
    paramType: PropMetadata
    paramName: string
    defaultValue: any
    required: boolean
}

export type ComponentParamUpdateAction = {
    type: "COMPONENT_PARAM_UPDATE",
    component: string
    paramName: string
    paramType?: PropMetadata
    //defaultValue: any
    required?: boolean
}

export type ComponentParamRemoveAction = {
    type: "COMPONENT_PARAM_REMOVE",
    component: string
    paramName: string
}

export type DocActionSet = {
    type: "ACTION_SET"
    actions: DocAction[]
}

export type DocAction = 
    ElementAddAction | ElementMoveAction | ElementRemoveAction | ElementUpdateAction |
    ComponentAddAction | ComponentRenameAction |
    ComponentParamAddAction | ComponentParamUpdateAction | ComponentParamRemoveAction | 
    DocActionSet;

export type PropEditorRenderProps = {
    renderPropEditor: PropEditorFactory 
    path: string[]
    propType: PropMetadata
    propName: string
    compact: boolean
    value: any
    defaultValue: any
    
    onChange: (propName:string, value:any) => void
}

export type PropEditorFactory = (renderProps: PropEditorRenderProps) => JSX.Element
