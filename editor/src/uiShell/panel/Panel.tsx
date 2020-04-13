import * as React from "react";
import "./panel.css";
import "./panel-l1.css";
import "./panel-l2.css";
import "./panel-l3.css";
import "./panel-body.css";
import { classes } from "../utils";

const cssOpen:React.CSSProperties = {
    overflowX: "hidden",
    overflowY: "scroll",
} 

interface Props {
    style: React.CSSProperties
    
}

export const Panel:React.SFC<Props> = (props) => {

    const computedCss = {
        ...props.style, 
        ...cssOpen
    }
    return (
        <div className={classes("panel")} style={computedCss}>
            {props.children}
        </div>
    );
}