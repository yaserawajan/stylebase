import * as React from "react";
import "./navbar.css";
import { classes } from "../utils";

interface Props {
    style?: React.CSSProperties
    className?: string
}

export const NavBar:React.SFC<Props> = ({ style, className, children }) => (
    
    
    <div className={classes("navbar", className)} style={style}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "start" }}>
        
            <span style={{marginLeft:10 }}>S T Y L E B A S E</span>
        </div>
    </div>

);