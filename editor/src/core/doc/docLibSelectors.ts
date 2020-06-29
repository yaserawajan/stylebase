
import { DocLibState } from "./docLibModels"
import { DOC_LIB } from "./docLibReducer"
import { ComponentUri } from "./docModels";
import { DocState } from "./state/stateModels";
import { selectPresentState } from "../../patterns/docEditor/docEditorSelectors";


export const selectDocLibState = (s:any):DocLibState => s[DOC_LIB];

export const selectComponentMetadata = (s:any, uri: ComponentUri) => {
    if (uri.lib) {
        const { propTypes, defaultProps } = selectDocLibState(s).libs.byName[uri.lib].components[uri.component];
        return { propTypes, defaultProps }
    }
    else {
        const { propTypes: set, defaultProps } = selectPresentState<DocState>(s).components.byName[uri.component];
        return {
            propTypes: set.byName,
            defaultProps
        } 
    }
}

export const selectLibCollection = (s: DocLibState) => s.libs.byName;





