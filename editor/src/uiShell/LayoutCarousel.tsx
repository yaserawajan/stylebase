import "./layout_carousel.css";

import * as React from "react";
import ReactDOM = require("react-dom");

interface Props {

}

export const LayoutCarousel:React.SFC<Props> = (props) => {

    return ReactDOM.createPortal(
        <div className="layout-carousel">
            <div className="inner">
                {props.children}
            </div>
        </div>,
        document.getElementById("extended")
    )
}