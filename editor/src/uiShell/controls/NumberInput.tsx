
import * as React from "react";
import { classes } from "../utils";
import { InputIcon } from "./InputIcon";

interface Props {
    style?: React.CSSProperties
    className?: string
    value: number | undefined
    min?: number
    max?: number
    step?: number
    precision: number
    stepExclusive?: boolean
    placeholder?: string
    onChange: (value:number) => void
}

export const NumberInput:React.FC<Props> = (props) => {

    const [enteredValue, setEnteredValue] = React.useState(props.value !== undefined? props.value : "")
    
    const factor = Math.pow(10, props.precision || 0);
    const round = (n: number) => Math.round(n * factor) / factor

    const handleMinus = React.useCallback(() => {
        const r = round((props.value || props.max || 0) - props.step);
        const newValue = props.min === undefined? r: Math.max(r, props.min);
        setEnteredValue(newValue.toString())
        props.onChange(newValue)
    }, [props.value]);

    const handlePlus = React.useCallback(() => {
        const r = round((props.value || props.min || 0) + props.step);
        const newValue = props.max === undefined? r: Math.min(r, props.max);
        setEnteredValue(newValue.toString())
        props.onChange(newValue)
    }, [props.value]);

    

    const isValid = (str: string) => {
        if (str === "") return true
        const v = parseFloat(str)
        if (isNaN(v)) return false;
        if (props.min !== undefined && props.min > v) return false;
        if (props.max !== undefined && props.max < v) return false;
        return true
    }

    const handleChange = (e: any) => {
        if (props.stepExclusive) return;
        const newValue = e.target.value;
        setEnteredValue(newValue);
        if (!isValid(newValue)) return;
        props.onChange(newValue === "" ? undefined : parseFloat(newValue));
    }
    
    const minusDisabled = props.min !== undefined && props.value <= props.min;
    const plusDisabled = props.max !== undefined && props.value >= props.max;

    return (
        <div className={classes("row", props.className)} style={props.style}>
            {props.step && <InputIcon icon="minus" disabled={minusDisabled} onClick={handleMinus} />}
            <input 
                className={classes("input", "stretch", "text-center")} 
                placeholder={props.placeholder} 
                size={1} 
                type="text" 
                value={enteredValue} 
                onChange={handleChange} />
            {props.step && <InputIcon icon="plus" disabled={plusDisabled} onClick={handlePlus} />}
        </div>
    );
}

