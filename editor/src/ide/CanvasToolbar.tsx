import * as React from "react";

const css:React.CSSProperties = {
    backgroundColor: "#444",
    color: "white",
    position: "fixed",
    lineHeight: "50px",
    fontSize: 10,
    fontWeight: 300,
    padding: "0 0 0 10px",
    borderBottom: "1px solid #555"
}

interface Props {
    top: number
    left: number
    thickness: number
    right: number
}

export const CanvasToolbar:React.SFC<Props> = (props) => {

    return (

        <div style={{ ...css, top: props.top, left: props.left, right: props.right, height: props.thickness  }}>
            {props.children}
        </div>

    );

}