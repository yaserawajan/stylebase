import * as React from "react";
import { FormField } from "../../uiShell/controls/FormField";
import { InputArea } from "../../uiShell/controls/InputArea";
import { Input } from "../../uiShell/controls/Input";
import { Fluid } from "../../uiShell/layouts";
import { ModalForm } from "../ModalForm";


interface Props {
    remount?: boolean
    error?: string
    value: string
    onSubmit?: (newValue: string) => void
    onCancel?: () => void
}

export const ComponentNameEditor:React.FC<Props> = ({ value, onSubmit, onCancel, error, remount }) => {

    const ref = React.useRef(null);
    const [valueEntered, setValueEntered] = React.useState(value || "");

    const handleOk = () => {
        onSubmit(valueEntered);
    }

    React.useEffect(() => {
        ref.current.focus();
        ref.current.select();
    }, [error, remount]);

    return (
        <ModalForm onSubmit={handleOk} onCancel={onCancel} title="Component Name" canSubmit={valueEntered.length > 0}>
            
            <Fluid>

                <FormField name="New Name" className="occupy-all" errorMessage={error}>
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