import { PropsMap, PropMapMetadata, ComponentUri, PropMetadata, PropEditorFactory } from "./docModels"
import { EntitySet } from "../../patterns/entitySet/entitySetModels"


export type ComponentManifest = {
    definition: React.ComponentType<any>
    defaultProps: PropsMap
    propTypes: PropMapMetadata
}

export type ComponentLibManifest = {
    components: { [name:string]: ComponentManifest }
    types: { [name:string]: PropMetadata }
}

type RenderMap = { [k:string]: (componentUri:ComponentUri) => JSX.Element }

export type ComponentLibEditorManifest = {
    componentCards: RenderMap
    propEditorFactory: PropEditorFactory
}

export type DocLibCollection = {[k:string]:ComponentLibManifest}

export type DocLibState = {
    libs: EntitySet<ComponentLibManifest>,
    editorExtensions: EntitySet<ComponentLibEditorManifest>
}