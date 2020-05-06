
import * as React from "react";


interface Props {
    style?: React.CSSProperties
    className?: string
}

export const Toolbar:React.SFC<Props> = (props) => {

    return (
        <div className="toolbar row" style={props.style}>
            <div className="row" style={{ width: "100%" }}>
                {props.children}
            </div>
        </div>
    );

}