import * as React from "react";
import { classes } from "../utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    direction?: "x" | "y"
}

export const ScrollArea:React.SFC<Props> = ({ direction = "y", className: passedClassName, children, ...rest }) => {

    const className = classes(passedClassName, "scroll-area", direction);

    return (
        <div {...rest} className={className}>
            {children}
        </div>
    );
}