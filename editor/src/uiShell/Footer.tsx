import "./footer.less";

import * as React from "react";


interface Props { 
    bottom: number
    left: number
    thickness: number
    right: number
}
 
export const Footer:React.SFC<Props> = (props) => {

    return (

        <div className="footer" style={{ bottom: props.bottom, left: props.left, right: props.right, height: props.thickness  }}>
            {props.children}
        </div>

    );

}