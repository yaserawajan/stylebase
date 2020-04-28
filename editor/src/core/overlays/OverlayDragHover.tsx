import "./overlay_drag_hover.css";

import * as React from "react";
import { classes } from "../../uiShell/utils";
import { IconLA } from "../../uiShell/IconLA";

interface Props {
    actualRect: DOMRect
    element: string
    displayRect: DOMRect
    actionType: string  
}

export const OverlayDragHover:React.SFC<Props> = ({ displayRect, children, actionType }) => {

    const { top, left, width, height } = displayRect;
    return (
        <div key="drag-hover" className={classes("overlay-drag-hover", actionType)} style={{ top, left, width, height }}>
        
            {(actionType == "before") && <IconLA className="left" icon="arrow-left" />}

            {(actionType == "after") && <IconLA className="right" icon="arrow-right" />}

            {children}

        </div>
    );
}