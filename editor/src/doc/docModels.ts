

export type AnyDataType = {
    type: "any"

}

export type MapPropDesc = PropMetadata & {
    required?: boolean
}

export type MapDataType = {
    type: "map"
    properties: {
        [propName: string]: MapPropDesc
    }
}

export type ArrayDataType = {
    type: "array"
    itemType: PropMetadata
}

export type LengthDataType = {
    type: "length"

}

export type ColorDataType = {
    type: "color"

}

export type TextDataType = {
    type: "text"

}

export type BooleanDataType = {
    type: "boolean"

}

export type NumberDataType = {
    type: "number"

}

export type MediaDataType = {
    type: "media"
}

export type TemplateDataType = {
    type: "template"
}

export type ElementRefDataType = {
    type: "element"
    elementRef: string
}

export type PropMetadata = 
    AnyDataType | 
    MapDataType | 
    ArrayDataType | 
    LengthDataType | 
    ColorDataType | 
    BooleanDataType |
    TextDataType |
    NumberDataType |
    MediaDataType |
    TemplateDataType | 
    ElementRefDataType;

export type PropMapMetadata = {
    [propName:string]: MapPropDesc
}

export type ComponentStateMapMetadata = {
    [state:string]: (props:any) => boolean
}

export type PropsMap = {
    [name:string]: any
}

export type PropValues  = {
    all: PropsMap,
    byState: {
        [state: string]: PropsMap
    }
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
    namedCounters: { 
        [type: string]: number 
    }
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

export type Location = LocationBefore | LocationAfter;

export type ElementAddAction = {
    type: "ELEMENT_ADD"
    elementType: ComponentUri
    props: ElementProps 
    location: Location
}

export type ElementMoveAction = {
    type: "ELEMENT_MOVE"
    fromComponent: string
    fromElementId: string
    location: Location
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

export type DocAction = ElementAddAction | ElementMoveAction | ElementRemoveAction | ElementUpdateAction;