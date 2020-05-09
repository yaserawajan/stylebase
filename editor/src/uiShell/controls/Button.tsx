
import * as React from "react";

import { IconLA } from "./IconLA";
import { classes } from "../utils";

interface Props {
    style?: React.CSSProperties
    className?: string
    disabled?: boolean
    label: string
    icon?: string
    
    onClick?: () => void
}

export const Button:React.SFC<Props> = (props) => {

    return (
        <button 
            disabled={props.disabled}
            onClick={props.onClick} 
            style={props.style} 
            className={classes("button", props.disabled && "disabled", props.className)}>
            {props.icon? <div className="icon"><IconLA icon={props.icon} /></div> : null}
            <div className="text">{props.label}</div>
        </button>
    );
}