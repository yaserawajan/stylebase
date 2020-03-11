import * as React from "react";

const css:React.CSSProperties = {
    height: "50px", 
    width: "50px", 
    textAlign: "center", 
    
    lineHeight: "50px",
    position: "fixed",
    
}

const cssOff:React.CSSProperties = {
    backgroundColor: "#ccc",
    borderBottom: "1px solid #eee",
    borderRight: "1px solid #eee"
}

const cssOn:React.CSSProperties = {
    backgroundColor: "#eee",
    borderBottom: "1px solid white"
}

interface Props {
    style?: React.CSSProperties
    onToggle: () => void 
    isToggled: boolean
} 

export const SidePanelHandle:React.SFC<Props> = (props) => (
    <div 
        className="interactive navbar-button" 
        style={{ ...css, ...props.style, ...(props.isToggled? cssOn: cssOff) }}
        onClick={props.onToggle}>

        {props.children}
    
    </div>

);