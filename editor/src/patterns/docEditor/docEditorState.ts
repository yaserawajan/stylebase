
export type DocOpenAction  = {
    type: "DOC_EDITOR/OPEN"
    url: string
}

export type DocNewAction = {
    type: "DOC_EDITOR/NEW"
}

export type DocUpdatePreviewAction<TAction> = {
    type: "DOC_EDITOR/PREVIEW",
    preview: TAction
}

export const actionPreview = <TAction>(preview: TAction):DocUpdatePreviewAction<TAction> => ({
    type: "DOC_EDITOR/PREVIEW",
    preview
})

export type DocUpdateRevertAction = {
    type: "DOC_EDITOR/PREVIEW_REVERT"
}

export const actionRevert = ():DocUpdateRevertAction => ({
    type: "DOC_EDITOR/PREVIEW_REVERT"
})
 
export type DocUpdateAction<TAction> = {
    type: "DOC_EDITOR/UPDATE",
    update: TAction
}

export const actionUpdate = <TAction>(update: TAction):DocUpdateAction<TAction> => ({
    type: "DOC_EDITOR/UPDATE",
    update
})

export type DocUndoAction = {
    type: "DOC_EDITOR/UNDO"
}

export type DocRedoAction = {
    type: "DOC_EDITOR/REDO"
}

export type DocSaveAction = {
    type: "DOC_EDITOR/SAVE",
    url: string
}

export type DocSaveAsAction = {
    type: "DOC_EDITOR/SAVE_AS",
    url: string
}

export type DocUpdateSelectionAction<TAction, TSelection> = {
    type: "DOC_EDITOR/UPDATE_SELECTION"
    selection: Partial<TSelection>
}

export type DocEditorAction<TAction,TSelection> =  
    DocOpenAction |
    DocNewAction |
    DocUpdatePreviewAction<TAction> | 
    DocUpdateRevertAction |
    DocUpdateAction<TAction> |
    DocUndoAction |
    DocRedoAction |
    DocSaveAction | 
    DocSaveAsAction |
    DocUpdateSelectionAction<TAction,TSelection>;

export const selectionChanged = <TSelection>(selection: Partial<TSelection>):DocUpdateSelectionAction<any,TSelection> => ({
    type: "DOC_EDITOR/UPDATE_SELECTION",
    selection
})

export const actionUndo = ():DocUndoAction => ({
    type: "DOC_EDITOR/UNDO"
});

export const actionRedo = ():DocRedoAction => ({
    type: "DOC_EDITOR/REDO"
});

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
            const { data } = updateReducer(state.present, action.preview);
            return {
                ...state,
                preview: data
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
                future: newFuture,
                preview: newSnapshot.data
            }
        }

        return state;
    }
}
 
