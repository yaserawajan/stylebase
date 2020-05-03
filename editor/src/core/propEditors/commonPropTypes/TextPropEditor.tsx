import * as React from "react";

import { PropEditorRenderProps } from "../../doc/docModels";
import { InputBar } from "../InputBar";
import { Input } from "../Input";
import { FormField } from "../FormField";

interface Props extends PropEditorRenderProps {
    
}

export const TextPropEditor:React.SFC<Props> = (props) => {

    

    const handleChange = (newValue: string) => {
        
        props.onChange(props.propName, !!newValue ? newValue : undefined)
    }

    return (
        <FormField name={props.propName} key={props.propName} assigned={!!props.value}>
            <InputBar>
                <Input placeholder={props.defaultValue || ""} value={props.value} onChange={handleChange} />
            </InputBar>
        </FormField>
    );
}