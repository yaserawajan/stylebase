import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IdeState } from "../ideState";
import { optionChanged } from "./optionState";

interface InputContext {
    value?: string
    setValue: (value: string) => void 
}

interface Props {
    children: (ctx: InputContext) => JSX.Element
    subject: string
    allowNone?: boolean
}

export const OptionSelector:React.SFC<Props> = (props) => {

    const selectedValue = useSelector<IdeState,string>(s => s.options[props.subject]);
    const dispatch = useDispatch();
    const setValue = React.useCallback((value) => {
        dispatch(optionChanged(props.subject, 
            (props.allowNone && selectedValue == value)
                ? ""
                : value));
    }, [selectedValue]);

    return props.children({ setValue, value: selectedValue });
}

