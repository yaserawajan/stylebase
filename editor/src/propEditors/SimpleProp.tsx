import "./simple_prop.css";

import * as React from "react";
import { classes } from "../uiShell/utils";
import { humanizeIdentifier } from "./commonPropTypes/utils";

interface Props {
    compact?: boolean
    name: string
    assigned?: boolean
    oneLine?: boolean
}

export const SimpleProp:React.SFC<Props> = (props) => {

    return props.compact
        ? props.children as any
        : (
            <div className={classes(
                "column", 
                "simple-prop", 
                props.assigned && "assigned",
                props.oneLine && "one-line")}>
                <div className="prop-title">{humanizeIdentifier(props.name)}</div>
                <div className="prop-body">{props.children}</div>
            </div>
        );
}


