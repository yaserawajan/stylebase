// import "./input_overlay.css";

import * as React from "react";
import { classes } from "../../uiShell/utils";

interface Props {
    style?: React.CSSProperties
    className?: string
    onClick?: () => void
}

export const InputOverlay:React.SFC<Props> = React.forwardRef<any, Props>((props, ref) => {

    return (
        <div ref={ref} className={classes("input-overlay", props.className)} style={props.style} onClick={props.onClick}>
            {props.children}
        </div>
    )
})

