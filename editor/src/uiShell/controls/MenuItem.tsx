
import * as React from "react";

import { IconLA } from "./IconLA";
import { classes } from "../utils";



interface Props {
    style?: React.CSSProperties
    className?: string

    name: string
    disabled?: boolean
    label?: string
    icon?: string
    toggled?: boolean
    selected?: boolean
    onClick?: (name: string) => void
}

export const MenuItem:React.SFC<Props> = (props) => {

    const handleClick = () => {
        
        if (props.onClick) props.onClick(props.name);
    }

    return (
        <div key={props.name} 
            style={props.style}
            onClick={handleClick} 
            className={classes("menu-item", props.toggled && "toggled", props.selected && "selected", props.className)}>

            {props.icon
                ? <div className="icon"><IconLA icon={props.icon} /></div> 
                : null
            }
            {props.label
                ? <div className="text">{props.label}</div>
                : null}
        </div>
    );
}