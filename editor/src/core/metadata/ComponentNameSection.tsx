import * as React from "react";
import { FormField } from "../../uiShell/controls/FormField";
import { Title } from "../../uiShell/controls/Title";
import { Button } from "../../uiShell/controls/Button";
import { ComponentNameEditor } from "./ComponentNameEditor";
import { Modal } from "../../uiShell/controls/Modal";
import { useSelector, useDispatch } from "react-redux";
import { actionUpdate } from "../../patterns/docEditor/docEditorState";
import { docComponentRename } from "../doc/docActions";
import { useDocEditorState } from "../../patterns/docEditor/docEditorHooks";
import { selectPreviewState } from "../../patterns/docEditor/docEditorSelectors";
import { DocState } from "../doc/docModels";

interface Props {
    value: string
}

interface State {
    toggled: boolean
    error: string
    remount: boolean
}

export const ComponentNameSection:React.FC<Props> = ({ value }) => {

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

        // update document
        dispatch(actionUpdate(docComponentRename(value, newValue)));

        // close modal
        setState({ ...state, toggled: false });
    }

    return (
        <>
            <div className="row scale-3 palette-5 layout-form">

                <FormField name="Component Name" style={{ width: "100%" }}>
                    <Title>{value}</Title>
                    <div className="stretch" />
                    <Button icon="pen" label="Change" onClick={handleEdit} />
                </FormField>

            </div>

            {state.toggled && 
                <ComponentNameEditor 
                    error={state.error}
                    remount={state.remount}
                    value={value} 
                    onSubmit={handleSubmit}
                    onCancel={handleCancel} />
            }
        </>
    );
}