import * as React from "react";

const css:React.CSSProperties = {
    position: "fixed",
    backgroundColor: "#eee",
    //borderStyle: "solid",
    //borderColor: "white",
    //borderTop: "1px solid white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start"
}

const cssClose:React.CSSProperties = {
    overflow: "hidden"
}

const cssOpen:React.CSSProperties = {
    overflowX: "hidden",
    overflowY: "scroll",
    
}

interface Props {
    closedWidth: number
    openWidth: number
    top: number
    isOpen: boolean
    appearFrom: "left" | "right"
}

export const SidePanel:React.SFC<Props> = (props) => {

    const computedCss = props.appearFrom == "left"
        ? {
            ...css,
            top: props.top,
            left: 0,
            bottom: 0,
            //border: "0 1px 0 0",
            ...(props.isOpen? cssOpen : cssClose),
            width: props.isOpen? props.openWidth: props.closedWidth
        }
        : {
            ...css,
            top: props.top,
            right: 0,
            bottom: 0,
            //border: "0 1px 0 0",
            ...(props.isOpen? cssOpen : cssClose),
            width: props.isOpen? props.openWidth: props.closedWidth
        };
    return (
        
        <div style={computedCss}>
            {props.isOpen? props.children : null}
        </div>

    );




}