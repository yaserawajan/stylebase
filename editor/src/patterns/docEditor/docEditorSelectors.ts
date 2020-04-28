
import { DocEditorState } from "./docEditorState";

export const DOC_EDITOR = "editor";

export const selectEditorState = <TDoc,TSelection>(s:any) =>  s[DOC_EDITOR] as DocEditorState<TDoc,TSelection>;

export const selectActiveSelection = <TSelection>(s:any) => selectEditorState<any,TSelection>(s).present.selection;

export const selectPreviewState = <TDoc>(s:any) => selectEditorState<TDoc,any>(s).preview;

export const selectPresentState = <TDoc>(s:any) => selectEditorState<TDoc,any>(s).present.data;





