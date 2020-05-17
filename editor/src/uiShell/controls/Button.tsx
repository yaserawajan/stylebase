
import * as React from "react";

import { IconLA } from "./IconLA";
import { classes } from "../utils";

interface Props {
    style?: React.CSSProperties
    className?: string
    disabled?: boolean
    label: string
    icon?: string
    
    compact?: boolean

    onClick?: () => void
}

export const Button:React.SFC<Props> = (props) => {

    return (
        <button 
            disabled={props.disabled}
            onClick={props.onClick} 
            style={props.style} 
            className={classes("button", 
                props.disabled && "disabled", 
                props.compact && "compact",
                props.className)}>
            {props.icon? <div className="icon"><IconLA icon={props.icon} /></div> : null}
            {props.compact ? null : <div className="text"><span>{props.label}</span></div>}
        </button>
    );
}