import * as React from "react";
import "./panel.css";
import { Side } from "../models";
import { classes } from "../../utils";

const cssClose:React.CSSProperties = {
    overflow: "hidden"
}

const cssOpen:React.CSSProperties = {
    overflowX: "hidden",
    overflowY: "scroll",
    
}

interface Props {
    
    width: number
    top: number
    isOpen: boolean
    appearFrom: Side
}

export const Panel:React.SFC<Props> = (props) => {

    const computedCss = props.appearFrom == "left"
        ? {
            
            top: props.top,
            left: 0,
            bottom: 0,
            //border: "0 1px 0 0",
            ...(props.isOpen? cssOpen : cssClose),
            width: props.isOpen? props.width: 0
        }
        : {
            
            top: props.top,
            right: 0,
            bottom: 0,
            //border: "0 1px 0 0",
            ...(props.isOpen? cssOpen : cssClose),
            width: props.isOpen? props.width: 0
        };
    return (
        
        <div 
            className={classes("panel", props.appearFrom)} 
            style={computedCss}>

            {props.isOpen
                ? props.children
                : null}
        </div>

    );




}