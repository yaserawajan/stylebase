import "./overlay_hover.css";

import * as React from "react";
import { IconLA } from "../uiShell/IconLA";

interface Props {
    actualRect: DOMRect
    element: string
    displayRect: DOMRect  
}

export const OverlayHover:React.SFC<Props> = ({ element, displayRect, actualRect }) => {

    const { top, left, width, height } = displayRect;
    return (
        <div key="hover" className="overlay-hover" style={{ top, left, width, height }}>
            <div key="rd" style={{ position: "relative", top: 0, left: 0, width: "100%" }}>
                <div key="title" className="title">{element}</div>
            </div>
        </div>
    );
}