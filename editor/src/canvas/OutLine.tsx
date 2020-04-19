import * as React from "react";
import RectContext from "./RectContext";
import "./outline.css";
import { ElementRect } from "./types";

interface Props {
    style?: React.CSSProperties
    interactive?: boolean
    element: string
    children: (rect: ElementRect & { elementId: string }) => React.ReactNode
}

export const OutLine:React.SFC<Props> = ({ element, children, interactive, style }) => {

    const { rectMap } = React.useContext(RectContext);

    const { display, actual, info } = rectMap[element] || {};

    if (display === undefined) return <div />;

    return (
        <div className="outline" style={{ ...style, pointerEvents: interactive? undefined : "none" }}>
            {children({ display, actual, info, elementId: element })}
        </div>
    );

}

