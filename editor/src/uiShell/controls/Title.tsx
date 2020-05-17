import * as React from "react";
import { IconLA } from "./IconLA";
import { classes } from "../utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    icon?: string
    level?: "h1" | "h2" | "normal"
}

export const Title:React.SFC<Props> = ({ className, icon, level = "normal", children, ...rest }) => {

    return (
        <div {...rest} className={classes("caption", level, className)}>
            {icon && <div className="icon"><IconLA icon={icon} /></div>}
            <div className="text"><span>{children}</span></div>
        </div>
    );
}