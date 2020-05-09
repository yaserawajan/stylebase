import * as React from "react";
import { IconLA } from "./IconLA";
import { classes } from "../utils";

interface Props {
    className?: string
    style?: React.CSSProperties
    icon?: string
    secondary?: boolean
}

export const Title:React.SFC<Props> = ({ className, style, icon, secondary, children }) => {

    return (
        <div style={style} className={classes("title", secondary && "secondary", className)}>
            {icon && <div className="icon"><IconLA icon={icon} /></div>}
            <div className="text">{children}</div>
        </div>
    );
}