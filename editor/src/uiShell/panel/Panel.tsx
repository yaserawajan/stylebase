
import * as React from "react";

import { classes } from "../utils";

interface Props {
    style?: React.CSSProperties
    className?: string
}

export const Panel:React.SFC<Props> = (props) => {

    return (
        <div className={classes("panel column", props.className)} style={props.style}>
            {props.children}
        </div>
    );
}