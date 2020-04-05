

export type AnyDataType = {
    type: "any"

}

export type MapDataType = {
    type: "map"

}

export type ArrayDataType = {
    type: "array"

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
    type: "elementRef"
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
    [propName:string]: PropMetadata
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

export type ComponentLibManifest = {

    componentTypes: { [name:string]: React.ComponentType<any> }
}