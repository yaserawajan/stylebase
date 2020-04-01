import * as React from "react";
import { IconLA } from "../IconLA";
import { classes } from "../../utils";

interface Props {
    name: string
    disabled?: boolean
    label: string
    icon?: string
    isToggled?: boolean
    onClick?: (name: string) => void
}

export const Command:React.SFC<Props> = (props) => {

    const handleClick = () => {
        if (props.onClick) props.onClick(props.name);
    }

    return (
        <div key={props.name} onClick={handleClick} className={classes("command", props.isToggled? "toggled" : null)}>
            {props.icon? <IconLA className="command-icon" icon={props.icon} />: null}
            <div className="command-text">{props.label}</div>
        </div>
    );
}