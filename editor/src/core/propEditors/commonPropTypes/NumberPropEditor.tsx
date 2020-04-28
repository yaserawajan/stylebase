import * as React from "react";

import { PropEditorRenderProps, NumberDataType } from "../../doc/docModels";
import { InputBar } from "../InputBar";
import { SimpleProp } from "../SimpleProp";
import { Input } from "../Input";
import { InputIcon } from "../InputIcon";

interface Props extends PropEditorRenderProps {
    
}



export const NumberPropEditor:React.FC<Props> = (props) => {
    const propType = props.propType as NumberDataType

    const factor = Math.pow(10, propType.precision || 0);

    const [enteredValue, setEnteredValue] = React.useState(props.value !== undefined? props.value : "")

    const round = (n: number) => Math.round(n * factor) / factor

    const handleMinus = React.useCallback(() => {

        const r = round((props.value || propType.max || 0) - propType.step);
        const newValue = propType.min === undefined? r: Math.max(r, propType.min);
        
        setEnteredValue(newValue.toString())
        props.onChange(props.propName, newValue)
    }, [props.value]);

    const handlePlus = React.useCallback(() => {
        const r = round((props.value || propType.min || 0) + propType.step);
        const newValue = propType.max === undefined? r: Math.min(r, propType.max);

        setEnteredValue(newValue.toString())
        props.onChange(props.propName, newValue)
    }, [props.value]);

    

    const isValid = (str: string) => {
        if (str === "") return true
        const v = parseFloat(str)
        if (isNaN(v)) return false;
        if (propType.min !== undefined && propType.min > v) return false;
        if (propType.max !== undefined && propType.max < v) return false;
        return true
    }

    const handleChange = (newValue: string) => {
        setEnteredValue(newValue);
        if (!isValid(newValue)) return;
        
        props.onChange(props.propName, newValue === ""? undefined: parseFloat(newValue));
    }
    
    
    
    const minusDisabled = propType.min !== undefined && props.value <= propType.min;
    const plusDisabled = propType.max !== undefined && props.value >= propType.max;


    return (
        <SimpleProp name={props.propName} key={props.propName} assigned={props.value !== undefined} compact={props.compact}>
            <InputBar className={isValid(enteredValue)? "": "error"}>
                {propType.step && <InputIcon icon="minus" disabled={minusDisabled} onClick={handleMinus} />}
                <Input className="stretch text-center" value={enteredValue} onChange={handleChange} />
                {propType.step && <InputIcon icon="plus" disabled={plusDisabled} onClick={handlePlus} />}
            </InputBar>
        </SimpleProp>
    );
}