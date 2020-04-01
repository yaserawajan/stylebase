import * as React from "react";
import RectContext from "./RectContext";
import "./outline.css";
import { ElementRect } from "./types";

interface Props {
    element: string
    children: (rect: ElementRect & { element: string }) => React.ReactNode
}

export const OutLine:React.SFC<Props> = ({ element, children }) => {

    const { rectMap } = React.useContext(RectContext);

    const { display, actual } = rectMap[element] || {};
    
    
    if (display === undefined) return null;

    return (
        <div className="outline">
            {children({ display, actual, element })}
        </div>
    );

}

