import * as React from "react";

export const BodyStyler:React.SFC<{ style: React.CSSProperties, children?: never }> = ({ style }) => {

    React.useEffect(() => {
        for (var k in style) {
            document.body.style[k as any] = style[k as keyof React.CSSProperties] as any;
        }
    }, [style]);


    return null;
};