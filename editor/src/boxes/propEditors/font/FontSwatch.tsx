import * as React from "react";

import { BoxFont } from "../../types";
import { classes } from "../../../uiShell/utils";
import { toCssFont } from "../../cssUtils";
import { getFontProvider } from "../../webFontUtils";

type Props = Omit<BoxFont, "size"> & {
    style?: React.CSSProperties
    className?: string
    onClick?: () => void
}

export const FontSwatch:React.SFC<Props> = ({ onClick, style:passedStyle, className, children, ...font }) => {

    React.useEffect(() => {
        const p = getFontProvider(font.family.provider);
        if (p) p.download([{
            family: font.family,
            variants: [{ weight: font.weight, italic: font.italic }]
        }])
    }, [font.weight, font.family, font.italic]);
 
    const genStyle = toCssFont(font);

    const style = {
        ...passedStyle,
        ...genStyle,
        padding: "0 10px"
    }

    return (
        <div onClick={onClick} className={classes("font-swatch", className)} style={style}>
            {font.family.name}
        </div>
    );
}