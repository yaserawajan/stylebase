import * as React from "react";
import { classes } from "../uiShell/utils";

interface Props {
    style?: React.CSSProperties
    className?: string
}

export const InputGroup:React.SFC<Props> = (props) => {

    return (
        <div className={classes("input-group", props.className)} style={props.style}>
            {props.children}
        </div>
    );
}

