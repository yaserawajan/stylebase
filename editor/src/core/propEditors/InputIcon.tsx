// import "./input_icon.css";

import * as React from "react";
import { IconLA } from "../../uiShell/IconLA";
import { classes } from "../../uiShell/utils";

interface Props {
    className?: string
    style?: React.CSSProperties
    icon?: string
    disabled?: boolean
    onClick?: () => void
}

const noOp = () => { }

export const InputIcon:React.SFC<Props> = React.forwardRef<any, Props>((props, ref) => {

    return (
        <div ref={ref} style={props.style} 
            className={classes("input-icon", props.disabled && "disabled", props.className)} 
            onClick={props.disabled? noOp : props.onClick}>
            {props.icon 
                ? <IconLA icon={props.icon} />
                : props.children
            }
        </div>
    );
})