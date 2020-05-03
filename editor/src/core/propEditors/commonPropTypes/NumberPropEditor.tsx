import * as React from "react";

import { PropEditorRenderProps, NumberDataType } from "../../doc/docModels";
import { InputBar } from "../InputBar";
import { NumberInput } from "../NumberInput";
import { FormField } from "../FormField";

export const NumberPropEditor:React.FC<PropEditorRenderProps> = (props) => {
    
    const { max, min, precision, step, stepExclusive } = props.propType as NumberDataType;
    
    const handleChange = (newValue: number) => {
        props.onChange(props.propName, newValue);
    }
    
    return (
        <FormField name={props.propName} key={props.propName} assigned={props.value !== undefined}>
            <InputBar>
                <NumberInput 
                    className="stretch text-center" 
                    placeholder={props.defaultValue} 
                    value={props.value} 
                    onChange={handleChange} 
                    step={step}
                    stepExclusive={stepExclusive}
                    min={min}
                    max={max}
                    precision={precision} />
            </InputBar>
        </FormField>
    );
}