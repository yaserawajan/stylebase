import * as React from "react";
import { FormField } from "../../uiShell/controls/FormField";
import { Title } from "../../uiShell/controls/Title";
import { Button } from "../../uiShell/controls/Button";
import { ComponentNameEditor } from "./ComponentNameEditor";
import { useSelector, useDispatch } from "react-redux";
import { actionUpdate } from "../../patterns/docEditor/docEditorState";
import { docComponentRename } from "../doc/docActions";
import { useDocEditorState } from "../../patterns/docEditor/docEditorHooks";
import { DocState } from "../doc/docModels";
import { Block } from "../../uiShell/Block";
import { Stretcher } from "../../uiShell/controls";

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

        if (oldValue !== newValue) {
            // update document
            dispatch(actionUpdate(docComponentRename(value, newValue)));
        }

        // close modal
        setState({ ...state, toggled: false });
    }

    return (
        <>
            <Block scale={3} palette="light-grey-5" indent={[1, 2]}>
            
                <FormField name="Name">
                    <Title>{value}</Title>
                </FormField>

                <Stretcher />

                <Button icon="pen" label="Change" onClick={handleEdit} />

            </Block>
            
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