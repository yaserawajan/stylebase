import "./overlay_selection.css";

import * as React from "react";
import { IconLA } from "../uiShell/IconLA";

interface Props {
    actualRect: DOMRect
    element: string
    displayRect: DOMRect  
}

export const OverlaySelection:React.SFC<Props> = ({ element, displayRect, actualRect }) => {

    const { top, left, width, height } = displayRect;
    return (
        <div key="selection" className="overlay-selection" style={{ top, left, width, height }}>
            <div key="rd" style={{ position: "relative", top: 0, left: 0, width: "100%" }}>

                <div key="top-left" className="corner top-left" />
                <div key="top-right" className="corner top-right" />
                <div key="bottom-left" className="corner bottom-left" />
                <div key="bottom-right" className="corner bottom-right" />
                <div key="title" className="title">{element}</div>
                <div key="width" className="width"><IconLA icon="arrow-left"/> {actualRect.width} px <IconLA icon="arrow-right"/></div>
                <div key="height" className="height" style={{ width: height }}><IconLA icon="arrow-left"/>{actualRect.height} px <IconLA icon="arrow-right"/></div>
            </div>
        </div>
    );
}