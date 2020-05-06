
import * as React from "react";

import { IconLA } from "./IconLA";
import { classes } from "../utils";

interface Props {
    style?: React.CSSProperties
    className?: string
    name: string
    disabled?: boolean
    label: string
    icon?: string
    
    onClick?: (name: string) => void
}

export const Button:React.SFC<Props> = (props) => {

    const handleClick = () => {
        if (props.onClick) props.onClick(props.name);
    }

    return (
        <div key={props.name} onClick={handleClick} style={props.style} className={classes("button", props.className)}>
            {props.icon? <div className="icon"><IconLA icon={props.icon} /></div> : null}
            <div className="text">{props.label}</div>
        </div>
    );
}