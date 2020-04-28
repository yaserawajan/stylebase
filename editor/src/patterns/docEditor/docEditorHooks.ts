import { useSelector } from "react-redux";
import { selectActiveSelection, selectEditorState } from "./docEditorSelectors";
import { DocEditorState } from "./docEditorState";

export const useDocSelectionState = <TSelection>() => useSelector<any, TSelection>(s => selectActiveSelection(s));

export const useDocEditorState = <TDoc = any, TSel = any, TResult = any>(selector: (docEditor: DocEditorState<TDoc,TSel>) => TResult, eq?: (r1:TResult,r2:TResult) => boolean) => {
    return useSelector<any, TResult>(s => selector(selectEditorState<TDoc,TSel>(s)), eq);
}