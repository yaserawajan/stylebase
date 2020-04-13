import { PropMetadata, PropValues, ElementDesc, PropsMap, ComponentUri } from "./docMetadata"
import { EntitySet } from "../entitySet/entitySetModels"

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

export type ElementAddAction = {
    type: "ELEMENT_ADD",
    containerElement: string,
    afterElement?: string,
    newId: string,
    component: ComponentUri,
    props: ElementProps 
}

export type ElementRemoveAction = {
    type: "ELEMENT_REMOVE",
    element: string
}


export type ElementUpdateAction = {
    type: "ELEMENT_UPDATE",
    element: string,
    props: ElementProps
}

export type DocAction = ElementAddAction | ElementRemoveAction | ElementUpdateAction;
