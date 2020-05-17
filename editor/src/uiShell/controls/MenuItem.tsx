
import * as React from "react";

import { IconLA } from "./IconLA";
import { classes } from "../utils";



interface Props {
    style?: React.CSSProperties
    className?: string

    disabled?: boolean
    label?: string
    icon?: string
    toggled?: boolean
    selected?: boolean
    onClick?: () => void
    //onChange?: ()
}

export const MenuItem:React.SFC<Props> = (props) => {

    
    return (
        <label 
            style={props.style}
            
            className={classes("menu-item", props.toggled && "toggled", props.selected && "selected", props.className)}>

            <input type="checkbox" tabIndex={0} checked={props.selected} onChange={props.onClick} />

            {props.icon
                ? <div className="icon"><IconLA icon={props.icon} /></div> 
                : null
            }
            {props.label
                ? <div className="text"><span>{props.label}</span></div>
                : null}

            <div className="marker" />
        </label>
    );
}