import { PropMapMetadata, PropMetadata } from "./dataTypes/models"
import { Expression } from "./expressions/models"



export type PropsMap = {
    [name:string]: any
}

export type ElementProps = {
    [prop:string]: Expression<any>
}

export type ElementDesc = {
    type: ComponentUri
    props: ElementProps
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


export type RenderContext = {
    params: PropsMap
}
