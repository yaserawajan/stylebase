import "./color_swatch.css";

import * as React from "react";
import { classes } from "../../../uiShell/utils";

interface Props {
    color: any
    className?: string
    style?: React.CSSProperties
}

export const ColorSwatch:React.FC<Props> = ({ color, children, className, style }) => {

    return (
        <div className={classes("color-swatch", className)} style={style}>

            <div className="inner" style={{ backgroundColor: color? `rgba(${color.r},${color.g},${color.b}, ${color.a})` : undefined }}>

                {children} &nbsp;

            </div>
            
        </div>
    );
}