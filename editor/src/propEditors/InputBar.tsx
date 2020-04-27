import "./input_bar.css";

import * as React from "react";
import { classes } from "../uiShell/utils";

interface Props {
    style?: React.CSSProperties
    className?: string
    onClick?: () => void
}

export const InputBar:React.SFC<Props> = (props) => {

    return (
        <div className={classes("input-bar", props.className)} style={props.style} onClick={props.onClick}>
            {props.children}
        </div>
    );
}

