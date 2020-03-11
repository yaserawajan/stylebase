import * as React from "react";
import { IconLA } from "./IconLA";
import { classes } from "../utils";

const css:React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    borderTop: "1px solid white",
    userSelect: "none"
}

const headerCss:React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    padding: "5px 5px 5px 0",
    borderLeft: "10px solid #ccc",
    lineHeight: "30px",
    //backgroundColor: "#ccc",
    backgroundColor: "#eee",
    //backgroundColor: "#444",
    height: 40
}

const titleCss:React.CSSProperties = {
    //lineHeight: "100%",
    fontSize: "14px",
    paddingLeft: 5,
    fontWeight: 400,
    display: "flex",
    flexDirection: "column"
}

const subtitleCss:React.CSSProperties = {
    fontSize: 10,

}

const toggleCss:React.CSSProperties = {
    width: 40,
    textAlign: "center"
}

const bodyCss:React.CSSProperties = {
    borderTop: "1px solid #ccc",
    //padding: 20,
    padding: "15px 0",
    
    backgroundColor: "#fff"
}

interface Props {
    name: string
    title: string
    subtitle?: string
    isToggled: boolean
    onToggle: (name: string) => void
}

export const SidePanelSection:React.SFC<Props> = (props) => {

    const handleClick = () => {
        props.onToggle(props.name);
    }

    return (

        <div style={css}>
            <div style={headerCss} onClick={handleClick}>

                <div style={toggleCss}>
                    <IconLA 
                        icon="angle-right" 
                        size="la-lx"
                        className={classes("rotatable", props.isToggled? "rotate-90-cw" : "rotate-0")} />
                </div>

                <div style={titleCss}>
                    <span>{props.title}</span>
                    {props.subtitle? <span style={subtitleCss}>{props.subtitle}</span>: null}
                </div>
                
            </div>
            {props.isToggled
                ? <div style={bodyCss}>
                    {props.children}
                </div> 
                : null
            }
        </div>

    );


}

