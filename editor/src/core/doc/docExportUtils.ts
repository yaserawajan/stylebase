import { DocFormat, ComponentMetadata } from "./docModels";
import { DocState, ComponentState } from "./state/stateModels";

const exportComponent = (componentState: ComponentState):ComponentMetadata => {
    return {
        defaultProps: componentState.defaultProps,
        elements: componentState.elements.byName,
        propTypes: componentState.propTypes.byName,
        rootElement: componentState.rootElement
    }
}

export const exportDocState = (docState: DocState):DocFormat => {

    let components:any = {}

    for (const k in docState.components.byName) {
        const state = docState.components.byName[k];
        components[k] = exportComponent(state);
    }

    return {
        imports: docState.imports,
        components
    };

}