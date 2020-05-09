import * as React from "react";
import { FormField } from "../../uiShell/controls/FormField";
import { Button } from "../../uiShell/controls/Button";
import { Modal } from "../../uiShell/controls/Modal";
import { InputArea } from "../../uiShell/controls/InputArea";
import { Input } from "../../uiShell/controls/Input";

interface State {
    modalVisible: boolean
    valueEntered: string
}

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
        <Modal onCancel={onCancel} title="Component Name">
            <div key="d1" className="layout-form palette-5" style={{ width:"100%" }}>
            
                <div className="row">

                    <FormField name="New Name" className="size-full" errorMessage={error}>
                        <InputArea>
                            <Input ref={ref} placeholder={"Component Name"} 
                                value={valueEntered} 
                                onChange={setValueEntered} />
                        </InputArea>
                    </FormField>

                </div>

            </div>

            <div key="d2" className="row layout-form palette-3" style={{ width:"100%" }}>

                <Button className="size-half" label="Cancel" onClick={onCancel} />

                <Button className="size-half" label="Change" 
                    onClick={handleOk} 
                    disabled={valueEntered.length < 1 || value === valueEntered} />
            
            </div>
        </Modal>
    );
}