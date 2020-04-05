import { PropMetadata, PropValues, ElementDesc, PropsMap } from "./docMetadata"

export type DocSelection = {
    component: string
    elements: string[]
}

export type EntitySet<T> = {
    all: string[]
    byName: {
        [name: string]: T
    }
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
    element: string,
    component: string,
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
