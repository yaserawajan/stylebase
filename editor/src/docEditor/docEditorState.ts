
import { useSelector } from "react-redux";

export type DocOpenAction<TAction>  = {
    type: "DOC_EDITOR/OPEN"
    url: string
}

export type DocNewAction<TAction> = {
    type: "DOC_EDITOR/NEW"
}

export type DocUpdatePreviewAction<TAction> = {
    type: "DOC_EDITOR/PREVIEW",
    preview: TAction
}

export type DocUpdateRevertAction<TAction> = {
    type: "DOC_EDITOR/PREVIEW_REVERT"
}

export type DocUpdateAction<TAction> = {
    type: "DOC_EDITOR/UPDATE",
    update: TAction
}

export type DocUndoAction<TAction> = {
    type: "DOC_EDITOR/UNDO"
}

export type DocRedoAction<TAction> = {
    type: "DOC_EDITOR/REDO"
}

export type DocSaveAction<TAction> = {
    type: "DOC_EDITOR/SAVE",
    url: string
}

export type DocSaveAsAction<TAction> = {
    type: "DOC_EDITOR/SAVE_AS",
    url: string
}

export type DocUpdateSelectionAction<TAction, TSelection> = {
    type: "DOC_EDITOR/UPDATE_SELECTION"
    selection: Partial<TSelection>
}

export type DocEditorAction<TAction,TSelection> =  
    DocOpenAction<TAction> |
    DocNewAction<TAction> |
    DocUpdatePreviewAction<TAction> | 
    DocUpdateRevertAction<TAction> |
    DocUpdateAction<TAction> |
    DocUndoAction<TAction> |
    DocRedoAction<TAction> |
    DocSaveAction<TAction> | 
    DocSaveAsAction<TAction> |
    DocUpdateSelectionAction<TAction,TSelection>;

export const selectionChanged = <TSelection>(selection: Partial<TSelection>):DocUpdateSelectionAction<any,TSelection> => ({
    type: "DOC_EDITOR/UPDATE_SELECTION",
    selection
})



export type DocSnapshot<TDoc,TSelection> = {
    data: TDoc
    selection: TSelection
}

export type DocEditorState<TDoc,TSelection> = {
    past: DocSnapshot<TDoc,TSelection>[]
    future: DocSnapshot<TDoc, TSelection>[]
    present: DocSnapshot<TDoc, TSelection>
    preview: TDoc
} 


export type DocEditorOptions<TDoc,TUpdateAction,TSelection> = {
    defaultSelection: (doc: TDoc) => TSelection
    defaultDoc: () => TDoc
    updateReducer: (docSnapshot: DocSnapshot<TDoc,TSelection>, update: TUpdateAction) => DocSnapshot<TDoc,TSelection>
}

export const createEditorReducer = 
    <TDoc,TUpdateAction,TSelection>({ defaultSelection, defaultDoc, updateReducer }:DocEditorOptions<TDoc,TUpdateAction,TSelection>) => {

    const data = defaultDoc();
    const initState:DocEditorState<TDoc,TSelection> = {
        past: [],
        future: [],
        present: {
            data,
            selection: defaultSelection(data)
        },
        preview: data
    }

    return (state: DocEditorState<TDoc,TSelection> = initState, action: DocEditorAction<TUpdateAction,TSelection>)
        : DocEditorState<TDoc,TSelection> => {

        if (action.type == "DOC_EDITOR/UPDATE_SELECTION") {
            return {
                ...state, 
                present: {
                    ...state.present,
                    selection: {
                        ...state.present.selection,
                        ...action.selection
                    }
                }
            }
        }

        if (action.type == "DOC_EDITOR/PREVIEW") {
            const { data, selection } = updateReducer(state.present, action.preview);
            return {
                ...state,
                preview: data,
                present: {
                    ...state.present,
                    selection
                }
            }
        }

        if (action.type == "DOC_EDITOR/PREVIEW_REVERT") {
            return {
                ...state, 
                preview: state.present.data
            }
        }

        if (action.type == "DOC_EDITOR/UPDATE") {
            
            const newSnapshot = updateReducer(state.present, action.update); 

            return {
                ...state, 
                present: newSnapshot,
                past: [state.present, ...state.past],
                future: [],
                preview: newSnapshot.data
            }
        }

        if (action.type == "DOC_EDITOR/UNDO") {
            if (state.past.length < 1) throw "Cannot undo. No past available";
            const [oldSnapshot, ...newPast] = state.past;
            return {
                ...state, 
                present: oldSnapshot,
                past: newPast,
                future: [state.present, ...state.future],
                preview: oldSnapshot.data
            }
        }
        
        if (action.type == "DOC_EDITOR/REDO") {
            if (state.future.length < 1) throw "Cannot redo. No future available";
            const [newSnapshot, ...newFuture] = state.future;
            return {
                ...state,
                present: newSnapshot,
                past: [state.present, ...state.past],
                future: newFuture
            }
        }

        return state;
    }
}
 
