
import * as React from "react";
import { LayoutRoot } from "../LayoutRoot";
import { Block } from "../Block";


interface Props {
    style?: React.CSSProperties
    className?: string
}

export const Toolbar:React.SFC<Props> = ({ style, className, children }) => {

    return (
        <LayoutRoot style={style} className={className} palette="dark-grey-2">
            <Block scale={1}>
                {children}
            </Block>
        </LayoutRoot>
    );

}