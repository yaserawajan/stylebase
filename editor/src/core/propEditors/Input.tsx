import "./input.less";

import * as React from "react";
import { classes } from "../../uiShell/utils";

interface Props {
    style?: React.CSSProperties
    className?: string
    value: string
    placeholder?: string
    onChange: (value:string) => void
}

export const Input = React.forwardRef((props: Props, ref) => {

    const handleChange = (e:any) => {
        props.onChange(e.target.value);
    }

    return (
        <input 
            ref={ref as any}
            className={classes("input", props.className)} 
            style={props.style}
            placeholder={props.placeholder} 
            size={1} 
            type="text" 
            value={props.value || ""} 
            onChange={handleChange} />
    );
});

