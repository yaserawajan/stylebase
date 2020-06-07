import React = require("react");

import { useDocEditorState } from "../../patterns/docEditor/docEditorHooks";
import { DocState } from "../doc/docModels";
import { useDispatch } from "react-redux";
import { actionUpdate } from "../../patterns/docEditor/docEditorState";
import { docComponentRename } from "../doc/docActions";

interface State {
    toggled: boolean
    error: string
    remount: boolean
}

export const useComponentRename = (value: string) => {

    const componentNames:string[] = useDocEditorState<DocState>(s => s.preview.components.all);

    const [state, setState] = React.useState<State>({ toggled: false, error: null, remount: false });

    const dispatch = useDispatch();

    const handleEdit = () => setState({ ...state, error: null, toggled: true });
    
    const handleCancel = () => setState({ ...state, toggled: false });

    const handleSubmit = (newValue: string) => { 

        const oldValue = value;

        let error:string = null;

        // validate

        if (!(/^[$A-Z_a-z][0-9A-Z_a-z$]*$/.test(newValue))) {
            error = "Component name must be a valid identifier";
        }

        if (componentNames.filter(d => d != oldValue).indexOf(newValue) !== -1) {
            error = "Duplicate name. Name must be unique";
        }

        if (error) {
            setState(s => ({ ...s, error, remount: !s.remount }));
            return;
        }

        if (oldValue !== newValue) {
            // update document
            dispatch(actionUpdate(docComponentRename(value, newValue)));
        }

        // close modal
        setState({ ...state, toggled: false });
    }

    return {
        ...state,
        handleCancel,
        handleEdit,
        handleSubmit
    }
}