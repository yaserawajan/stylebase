import * as React from "react";
import RectContext from "./RectContext";
import "./outline.css";

interface Props {
    element: string
    
}

export const OutLine:React.SFC<Props> = ({ element }) => {

    const { rectMap } = React.useContext(RectContext);

    const { top, left, width, height } = rectMap[element] || {};

    return (
        <div className="outline" style={{ top: top, left: left, height, width }}>
            {element}
        </div>
    );

}

