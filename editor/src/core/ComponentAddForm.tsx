import * as React from "react";
import { useDispatch } from "react-redux";
import { actionUpdate } from "../patterns/docEditor/docEditorState";
import { docComponentAdd } from "./doc/state/actions";
import { ModalForm } from "./ModalForm";
import { Fluid } from "../uiShell/layouts";
import { FormField } from "../uiShell/controls/FormField";
import { InputArea } from "../uiShell/controls/InputArea";
import { Input } from "../uiShell/controls/Input";
import { newId } from "./doc/state/newId";
import { useDocEditorState } from "../patterns/docEditor/docEditorHooks";
import { DocState } from "./doc/state/stateModels";

interface State {
    valueEntered: string
    error: string
    remount: boolean
}

interface Props { 
    onCancel: () => void
    onSuccess: (componentName: string) => void
}

export const ComponentAddForm:React.SFC<Props> = (props) => {

    const componentNames:string[] = useDocEditorState<DocState>(s => s.preview.components.all);
    const dispatch = useDispatch();
    const ref = React.useRef(null);
    const [{ valueEntered, error, remount }, setState] = React.useState<State>({
        valueEntered: newId("Component", componentNames),
        error: null,
        remount: false
    });

    React.useEffect(() => {
        ref.current.focus();
        ref.current.select();
    }, [error, remount]);

    const setValueEntered = (v: string) => setState(s => ({ ...s, valueEntered: v }));
    
    const handleSubmit = () => {
        // validate
        let error:string = null;
        if (!(/^[$A-Z_a-z][0-9A-Z_a-z$]*$/.test(valueEntered))) {
            error = "Component name must be a valid identifier";
        }

        if (componentNames.indexOf(valueEntered) !== -1) {
            error = "Duplicate name. Name must be unique";
        }

        if (error) {
            setState(s => ({ ...s, error, remount: !s.remount }));
            return;
        }

        // do add
        dispatch(actionUpdate(docComponentAdd(valueEntered)));
        props.onSuccess(valueEntered);
    }

    return (
        <ModalForm onSubmit={handleSubmit} onCancel={props.onCancel} title="Add Component" canSubmit={valueEntered.length > 0}>
            
            <Fluid>
                <FormField name="New Component Name" className="occupy-all" errorMessage={error}>
                    <InputArea>
                        <Input ref={ref} placeholder={"Component Name"} 
                            value={valueEntered} 
                            onChange={setValueEntered} />
                    </InputArea>
                </FormField>
            </Fluid>

        </ModalForm>
    );
}