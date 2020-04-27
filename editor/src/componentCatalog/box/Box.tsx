import * as React from "react";
import { BoxStyleProps, createStyle, splitProps } from "./styleUtils";

export interface BoxProps<TTag extends keyof React.ReactHTML> 
    extends React.HTMLAttributes<TTag>, 
            React.RefAttributes<HTMLElement>, 
            BoxStyleProps {

    tag?: TTag
    children?: React.ReactNode
}



export const Box = 
    React.forwardRef((props: Partial<BoxProps<any>>, ref) => {
        
        const [styleProps, { tag, style: passedStyle, ...rest }] = splitProps(props);

        const T = tag || "div";

        const style = {
            ...createStyle(styleProps),
            ...passedStyle
        };

        return <T ref={ref} style={style} { ...rest } />
    });
 