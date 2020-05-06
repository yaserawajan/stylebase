import * as React from "react";

import { PropEditorRenderProps } from "../../doc/docModels";
import { InputArea } from "../../../uiShell/controls/InputArea";
import { Input } from "../../../uiShell/controls/Input";
import { FormField } from "../../../uiShell/controls/FormField";

interface Props extends PropEditorRenderProps {
    
}

export const TextPropEditor:React.SFC<Props> = (props) => {

    

    const handleChange = (newValue: string) => {
        
        props.onChange(props.propName, !!newValue ? newValue : undefined)
    }

    return (
        <FormField name={props.propName} key={props.propName} assigned={!!props.value}>
            <InputArea>
                <Input placeholder={props.defaultValue || ""} value={props.value} onChange={handleChange} />
            </InputArea>
        </FormField>
    );
}