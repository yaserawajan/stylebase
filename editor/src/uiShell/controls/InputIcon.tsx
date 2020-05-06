
import * as React from "react";
import { IconLA } from "./IconLA";
import { classes } from "../utils";

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
            className={classes("icon", props.disabled && "disabled", props.className)} 
            onClick={props.disabled? noOp : props.onClick}>
            {props.icon 
                ? <IconLA icon={props.icon} />
                : props.children
            }
        </div>
    );
})