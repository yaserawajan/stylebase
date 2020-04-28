import * as React from "react";

import { toCssColor } from "../cssUtils";
import { TextProps } from "../types";
import { textPropDefaults } from "./propDefaults";



export const Text = React.forwardRef(
    ({ text:passedText, color:passedColor }: TextProps, ref) => {

        const color = passedColor || textPropDefaults.color;
        const text = passedText || textPropDefaults.text;

        return (
            <span ref={ref as any} 
                style={{ 
                    color: color !== undefined ? toCssColor(color) : undefined
                }}>
                {text}
            </span>
        )
    })