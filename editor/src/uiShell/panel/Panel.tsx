import * as React from "react";
import "./panel.css";
import { classes } from "../../utils";

const cssClose:React.CSSProperties = {
    overflow: "hidden"
}

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