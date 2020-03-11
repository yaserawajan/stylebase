import * as React from "react";
import "./ArtifactTitle.css";
import { IconLA } from "./IconLA";


const css:React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    //padding: "10px 5px 15px 5px",
    justifyContent: "start",
    backgroundColor: "#444",
    borderBottom: "1px solid #555",
    //borderRight: "1px solid #ccc",
    height: 50,
    
}

const backCss:React.CSSProperties = {
    //color: "#68838B",
    color: "#eee",
    //color: "#eee",
    width: 50,
    //height: 40,
    lineHeight: "50px",
    textAlign: "center",
    backgroundColor: "#555",
}

const selectedCss:React.CSSProperties = {
    fontFamily: "monospace",
    flex: "1 1 auto",
    //fontWeight: "bold",
    fontSize: "16px",
    //color: "#E0EEEE",
    color: "#eee",
    //color: "#68838B",
    display: "flex",
    flexDirection: "column",
    //alignItems: "center",
    paddingTop: 5,
    //justifyContent: "center",
    paddingLeft: 10,
    //borderLeft: "1px dotted #777"
}

const labelCss:React.CSSProperties = {
    marginTop: 3,
    fontWeight: 300,
    fontSize: 10,
    fontFamily: "Roboto",
    color: "#ccc"
}

interface Props {
    style?: React.CSSProperties
    className?: string
}

export const ArtifactTitle:React.SFC<Props> = ({ style, className }) => {

    return (

        <div style={{ ...css, ...style }} className={className}>
            <div style={backCss} className="interactive">
                <IconLA icon="arrow-left" />
            </div>
            <div style={selectedCss}>
                {"FancyDropDown"}
                <div style={labelCss}>Component</div>
            </div>
            
        </div>

    );


}