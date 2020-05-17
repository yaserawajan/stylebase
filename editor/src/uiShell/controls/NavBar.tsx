
import * as React from "react";
import { classes } from "../utils";
import { LayoutRoot } from "../LayoutRoot";
import {  Row } from "../layouts";
import { Block } from "../Block";

interface Props {
    style?: React.CSSProperties
    className?: string
}

export const NavBar:React.SFC<Props> = ({ style, className, children }) => (
    <LayoutRoot style={style} className={className} palette="light-grey-3">
        <Block scale={1}>
            {children}
        </Block>
    </LayoutRoot>
);