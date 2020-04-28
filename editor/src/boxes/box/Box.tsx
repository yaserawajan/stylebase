import * as React from "react";

import { toCssColor, toCssLength } from "../cssUtils";
import { BoxStyleProps, BoxFill, BoxBorderStyle, BoxBorder, BoxPadding } from "../types";
import { boxPropDefaults } from "./propDefaults";

const toCssFill = ({ color }: Partial<BoxFill>):React.CSSProperties => ({
    backgroundColor: color === undefined ? undefined : toCssColor(color)
})

const toCssBorderEdge = ({ width, color, style }: BoxBorderStyle) => `${toCssLength(width)} ${style} ${toCssColor(color)}`;

const toCssBorder = ({ top, left, bottom, right }: Partial<BoxBorder>):React.CSSProperties => ({
    borderTop: top ? toCssBorderEdge(top) : undefined,
    borderRight: right ? toCssBorderEdge(right) : undefined,
    borderBottom: bottom ? toCssBorderEdge(bottom) : undefined,
    borderLeft: left ? toCssBorderEdge(left) : undefined
})

const toCssPadding = ({ top, left, bottom, right }: Partial<BoxPadding>):React.CSSProperties => ({
    paddingTop: top ? toCssLength(top) : undefined,
    paddingRight: right ? toCssLength(right) : undefined,
    paddingBottom: bottom ? toCssLength(bottom) : undefined,
    paddingLeft: left ? toCssLength(left) : undefined
})

const splitProps = <T extends { }>(combined: Partial<BoxStyleProps> & T):[BoxStyleProps, T] => {

    const { fill, border, padding, ...rest } = combined;
    return [{ fill, border, padding }, rest as any];
}

const createBoxCss = ({ fill, border, padding }: Partial<BoxStyleProps>):React.CSSProperties => {

    return {
        ...(fill ? toCssFill(fill) : {} ),
        ...(border ? toCssBorder(border) : {} ),
        ...(padding ? toCssPadding(padding) : {} )
     }
}



export interface BoxProps<TTag extends keyof React.ReactHTML> 
    extends React.HTMLAttributes<TTag>, 
            React.RefAttributes<HTMLElement>, 
            BoxStyleProps {

    tag?: TTag
    children?: React.ReactNode
}



export const Box = 
    React.forwardRef((props: Partial<BoxProps<any>>, ref) => {
        
        const [{ fill, border, padding }, { tag, style: passedStyle, ...rest }] = splitProps(props);

        const styleProps:BoxStyleProps = {
            ...boxPropDefaults,
            fill: {
                ...boxPropDefaults.fill,
                ...fill
            },
            border: {
                ...boxPropDefaults.border,
                ...border
            },
            padding: {
                ...boxPropDefaults.padding,
                ...padding
            }
        }

        const T = tag || "div";

        const style = {
            position: "relative",
            display: "flex",
            ...createBoxCss(styleProps),
            ...passedStyle
        };

        return <T ref={ref} style={style} { ...rest } />
    });
 