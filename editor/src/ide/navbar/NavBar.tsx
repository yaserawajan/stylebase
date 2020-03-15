import * as React from "react";
import "./navbar.css";
import { classes } from "../../utils";

interface Props {
    style?: React.CSSProperties
    className?: string
}

export const NavBar:React.SFC<Props> = ({ style, className, children }) => (
    
    
    <div className={classes("navbar", className)} style={style}>
        {children}
    </div>

);