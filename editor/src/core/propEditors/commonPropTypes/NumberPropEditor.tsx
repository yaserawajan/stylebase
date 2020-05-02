import * as React from "react";

import { PropEditorRenderProps, NumberDataType } from "../../doc/docModels";
import { InputBar } from "../InputBar";
import { SimpleProp } from "../SimpleProp";
import { NumberInput } from "../NumberInput";

export const NumberPropEditor:React.FC<PropEditorRenderProps> = (props) => {
    
    const { max, min, precision, step, stepExclusive } = props.propType as NumberDataType;
    
    const handleChange = (newValue: number) => {
        props.onChange(props.propName, newValue);
    }
    
    return (
        <SimpleProp name={props.propName} key={props.propName} assigned={props.value !== undefined} compact={props.compact}>
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
        </SimpleProp>
    );
}