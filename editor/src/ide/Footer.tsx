import * as React from "react";

const css:React.CSSProperties = {
    backgroundColor: "#444",
    color: "white",
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    lineHeight: "40px",
    fontSize: 10,
    fontWeight: 300,
    padding: "0 0 0 10px",
    borderTop: "1px solid #555",
    zIndex: 1000
}

interface Props { 
    bottom: number
    left: number
    thickness: number
    right: number
}

export const Footer:React.SFC<Props> = (props) => {

    return (

        <div style={{ ...css, bottom: props.bottom, left: props.left, right: props.right, height: props.thickness  }}>
            {props.children}
        </div>

    );

}