import * as React from "react";

export interface BoxProps<TTag extends keyof React.ReactHTML> extends React.HTMLAttributes<TTag>, React.RefAttributes<HTMLElement> {
    tag?: TTag
    children?: React.ReactNode
}

export const Box = 
    React.forwardRef((props: BoxProps<any>, ref) => {
        const { tag, ...rest } = props;
        const T = tag || "div";
        return <T ref={ref} {...rest} />
    });
