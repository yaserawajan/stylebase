

import * as React from "react";
import { classes } from "../utils";

interface Props 
    extends Omit<
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onChange"> {
    value: string
    onChange?: (value:string) => void
}
 
export const Input = React.forwardRef(({ 
    className, 
    value = "", 
    onChange, 
    ...props 
}: Props, ref) => {

    const handleChange = (e:any) => {
        onChange(e.target.value);
    }

    return (
        <input 
            {...props}
            ref={ref as any}
            className={classes("input", className)} 
            size={1} 
            type="text" 
            value={value}
            onChange={handleChange} />
    );
});

