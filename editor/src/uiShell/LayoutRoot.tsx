import * as React from "react";
import { classes } from "./utils";
import { Palette } from "./types";

interface Props {
    style?: React.CSSProperties
    className?: string
    palette?: Palette
    bg?: Palette
}

export const LayoutRoot:React.SFC<Props> = ({ className, style, children, palette, bg }) => {

    return (
        <div style={style} 
            className={classes("layout-root", className, palette && `pal-${palette}`, bg && `bg-${bg}`)}>
            {children}
        </div>
    );
}