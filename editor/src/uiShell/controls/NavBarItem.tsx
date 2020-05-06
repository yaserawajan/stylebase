
import * as React from "react";

import { IconLA } from "./IconLA";
import { classes } from "../utils";

interface Props {
    name: string
    disabled?: boolean
    label: string
    icon?: string
    toggled?: boolean
    selected?: boolean
    onClick?: (name: string) => void
}

export const NavBarItem:React.SFC<Props> = (props) => {

    const handleClick = () => {
        
        if (props.onClick) props.onClick(props.name);
    }

    return (
        <div key={props.name} 
            onClick={handleClick} 
            className={classes("navbar-item", props.toggled && "toggled", props.selected && "selected")}>

            {props.icon && <div className="icon"><IconLA icon={props.icon} /></div>}

            <div className="text">{props.label}</div>
        </div>
    );
}