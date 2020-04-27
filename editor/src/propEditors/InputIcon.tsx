import "./input_icon.css";

import * as React from "react";
import { IconLA } from "../uiShell/IconLA";
import { classes } from "../uiShell/utils";

interface Props {
    icon: string
    disabled?: boolean
    onClick?: () => void
}

const noOp = () => { }

export const InputIcon:React.SFC<Props> = (props) => {

    return (
        <div className={classes("input-icon", props.disabled? "disabled": null)} 
            onClick={props.disabled? noOp : props.onClick}>
            <IconLA icon={props.icon} />
        </div>
    );
}