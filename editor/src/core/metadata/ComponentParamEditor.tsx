import * as React from "react";
import { ModalForm } from "../ModalForm";
import { Fluid } from "../../uiShell/layouts";
import { FormField } from "../../uiShell/controls/FormField";
import { InputArea } from "../../uiShell/controls/InputArea";
import { Input } from "../../uiShell/controls/Input";

interface Props {
    //onSubmit?: ()
}

interface State {
    name: string
    type: string

}


export const ComponentParamForm:React.SFC<Props> = (props) => {

    const [{ name, type }, setState] = React.useState<State>({ name: "", type: "" })

    const setName = (value: string) => setState(s => ({ ...s, name: value }));

    const setType = (value: string) => setState(s => ({ ...s, type: value }));

    return (
        <ModalForm title="Component Parameter" >
            
            <Fluid>
                <FormField name="Name" className="occupy-half" key="name">
                    <InputArea>
                        <Input value={name} onChange={setName} />
                    </InputArea>
                </FormField>

                <FormField name="Data Type" className="occupy-half" key="type">
                    <InputArea>
                        <Input value={type} onChange={setType} />
                    </InputArea>
                </FormField>
            </Fluid>

        </ModalForm>
    );
}