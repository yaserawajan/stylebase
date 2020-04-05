import { DocSnapshot } from "../docEditor/docEditorState";
import { DocState, DocSelection, DocAction } from "./docState";

export const docUpdateReducer = (snapshot:DocSnapshot<DocState, DocSelection>, action: DocAction) => {

    return snapshot;
}