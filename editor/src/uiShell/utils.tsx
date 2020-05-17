
import * as React from "react";
import { forwardRef } from "react";

export const classes = (...args:string[]) => args.filter(a => !!a).join(" ");



interface Options<TTag extends keyof HTMLElementTagNameMap> {
    tag: TTag
    addClassName?: string
    addStyle?: React.CSSProperties
}

export const styledHtmlComponent = <TTag extends keyof HTMLElementTagNameMap>({ tag, addClassName = "", addStyle = {} }: Options<TTag>) => {
    type TProps = React.HTMLAttributes<HTMLElementTagNameMap[TTag]>;
    return forwardRef<HTMLElementTagNameMap[TTag],TProps>(({ style: styleIn, className: classNameIn, ...rest }, ref) => {
        const T = tag as any;
        const style:React.CSSProperties = { ...addStyle, ...styleIn };
        const className = classes(classNameIn, addClassName);
        return <T {...rest} ref={ref} className={className} style={style} /> 
    })
}
