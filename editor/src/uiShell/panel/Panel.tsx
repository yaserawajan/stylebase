import * as React from "react";
import "./panel.css";
import "./panel-l1.css";
import "./panel-l2.css";
import "./panel-l3.css";
import { classes } from "../utils";

interface Props {
    style: React.CSSProperties
    
}

export const Panel:React.SFC<Props> = (props) => {

    return (
        <div className={classes("panel")} style={props.style}>
            {props.children}
        </div>
    );
}