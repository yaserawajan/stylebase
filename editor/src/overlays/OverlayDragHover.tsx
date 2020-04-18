import "./overlay_drag_hover.css";

import * as React from "react";

interface Props {
    actualRect: DOMRect
    element: string
    displayRect: DOMRect
    actionType: string  
}

export const OverlayDragHover:React.SFC<Props> = ({ displayRect, children, actionType }) => {

    const { top, left, width, height } = displayRect;
    return (
        <div key="drag-hover" className="overlay-drag-hover" style={{ top, left, width, height }}>
        
            {actionType}

            {children}

        </div>
    );
}