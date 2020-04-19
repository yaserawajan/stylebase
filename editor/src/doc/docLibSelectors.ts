
import { DocLibState } from "./docLibModels"
import { DOC_LIB } from "./docLibReducer"
import { ComponentUri, DocState } from "./docModels";
import { selectPresentState } from "../docEditor/docEditorSelectors";


export const selectDocLibState = (s:any):DocLibState => s[DOC_LIB];

export const selectComponentMetadata = (s:any, uri: ComponentUri) => {
    if (uri.lib) {
        return selectDocLibState(s).libs.byName[uri.lib].components[uri.component].propTypes;
    }
    else {
        return selectPresentState<DocState>(s).components.byName[uri.component].propTypes.byName;
    }
}

export const selectLibCollection = (s: DocLibState) => s.libs.byName;





