import * as React from "react";

import { toCssColor, toCssFont } from "../cssUtils";
import { TextProps } from "../types";
import { textPropDefaults } from "./propDefaults";
import { getFontProvider } from "../webFontUtils";

export const Text = React.forwardRef(
    ({ text:passedText, color:passedColor, font:passedFont }: Partial<TextProps>, ref) => {

        const color = passedColor || textPropDefaults.color;
        const text = passedText || textPropDefaults.text;

        const font = {
            ...textPropDefaults.font,
            ...passedFont
        }

        React.useEffect(() => {
            const p = getFontProvider(font.family.provider);
            if (p) p.download([{
                family: font.family,
                variants: [{ weight: font.weight, italic: font.italic }]
            }], text);
        }, [font.weight, font.family, font.italic]);

        
        

        return (
            <span ref={ref as any} 
                style={{ 
                    color: color !== undefined ? toCssColor(color) : undefined,
                    fontSize: font.size,
                    ...toCssFont(font)
                }}>
                {text}
            </span>
        )
    })