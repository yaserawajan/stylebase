
import * as React from "react";

import { IconLA } from "./IconLA";
import { classes } from "../utils";

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label: string
    icon?: string
    compact?: boolean
}

export const Button:React.SFC<Props> = ({ children, icon, label, className, compact, ...props}) => {

    return (
        <button 
            {...props} 
            className={classes("button", 
                props.disabled && "disabled", 
                compact && "compact",
                className)}>
            {icon? <div className="icon"><IconLA icon={icon} /></div> : null}
            {compact ? null : <div className="text"><span>{label}</span></div>}
        </button>
    );
}