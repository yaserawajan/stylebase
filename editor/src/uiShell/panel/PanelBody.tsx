import * as React from "react";

import { classes } from "../utils";

interface Props {
    style?: React.CSSProperties
    className?: string
}

export const PanelBody:React.SFC<Props> = ({ className, style:passedStyle , children }) => {

    const style:React.CSSProperties = {
        ...passedStyle,
        flex: "1 1 auto",
        overflowY: "scroll"
    }

    return (
        <div className={classes("panel-body", className)} style={style}>
            {children}
        </div>
    );
}