
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

export type ElementState = {
    component: string
    propValues: {
        default: ElementProps,
        profiles: {
            [state: string]: ElementProps
        }
    }
}

export type ComponentMetadata = {
    propSchema: any
    states: any
}

export type ComponentState = {
    metadata: ComponentMetadata
    rootElement: string
    elements: EntitySet<ElementState>
}

export type DocState = {
    title: string
    components: EntitySet<ComponentState>
}



export type ElementAddAction = {
    type: "ELEMENT_ADD",
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