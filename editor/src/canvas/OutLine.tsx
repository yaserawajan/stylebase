import * as React from "react";
import RectContext from "./RectContext";
import "./outline.css";
import { ElementRect } from "./types";

interface Props {
    interactive?: boolean
    element: string
    children: (rect: ElementRect & { elementId: string }) => React.ReactNode
}

export const OutLine:React.SFC<Props> = ({ element, children, interactive }) => {

    const { rectMap } = React.useContext(RectContext);

    //console.log(rectMap);
    const { display, actual, info } = rectMap[element] || {};
    
    
    if (display === undefined) return null;

    const style:React.CSSProperties = interactive? { } : { pointerEvents: "none" } ;
    return (
        <div className="outline" style={style}>
            {children({ display, actual, info, elementId: element })}
        </div>
    );

}

