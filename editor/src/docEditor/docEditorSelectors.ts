import { useSelector } from "react-redux";
import { DocEditorState } from "./docEditorState";

export const DOC_EDITOR = "editor";

const selectEditorState = <TDoc,TSelection>(s:any) =>  s[DOC_EDITOR] as DocEditorState<TDoc,TSelection>;

export const selectActiveSelection = <TSelection>(s:any) => selectEditorState<any,TSelection>(s).present.selection;

export const selectDocState = <TDoc>(s:any) => selectEditorState<TDoc,any>(s).preview;

export const useDocSelectionState = <TSelection>() => useSelector<any, TSelection>(s => selectActiveSelection(s));

export const useDocEditorState = <TDoc, TSel, TResult>(selector: (docEditor: DocEditorState<TDoc,TSel>) => TResult, eq: (r1:TResult,r2:TResult) => boolean) => {
    return useSelector<any, TResult>(s => selector(selectEditorState<TDoc,TSel>(s)), eq);
}



