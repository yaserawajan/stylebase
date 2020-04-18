import { PropsMap, PropMapMetadata, ComponentUri } from "./docModels"
import { EntitySet } from "../entitySet/entitySetModels"


export type ComponentManifest = {
    definition: React.ComponentType<any>
    defaultProps: PropsMap
    propTypes: PropMapMetadata
}

export type ComponentLibManifest = {
    components: { [name:string]: ComponentManifest }

}

type RenderMap = { [k:string]: (componentUri:ComponentUri) => JSX.Element }

export type ComponentLibEditorManifest = {
    componentCards: RenderMap
}

export type DocLibCollection = {[k:string]:ComponentLibManifest}

export type DocLibState = {
    libs: EntitySet<ComponentLibManifest>,
    editorExtensions: EntitySet<ComponentLibEditorManifest>
}