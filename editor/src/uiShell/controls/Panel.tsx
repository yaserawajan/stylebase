import * as React from "react";

import { classes } from "../utils";
import { LayoutRoot } from "../LayoutRoot";
import { Col } from "../layouts";

interface Props {
    style?: React.CSSProperties
    className?: string
    appearFrom: "top" | "right" | "bottom" | "left"
}

export const Panel:React.SFC<Props> = ({ className, style, children, appearFrom }) => {

    return (
        <LayoutRoot style={style} 
            className={classes(className, `${appearFrom}-side`)} 
            palette="dark-grey-5"
            bg="light-grey-5">
            <Col>
                { children }
            </Col>
        </LayoutRoot>
    );
}