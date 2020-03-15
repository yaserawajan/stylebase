import * as React from "react";
import "./toolbar.css";

interface Props {
    top: number
    left: number
    thickness: number
    right: number
}

export const Toolbar:React.SFC<Props> = (props) => {

    return (

        <div className="toolbar" style={{ top: props.top, left: props.left, right: props.right, height: props.thickness  }}>
            {props.children}
        </div>

    );

}