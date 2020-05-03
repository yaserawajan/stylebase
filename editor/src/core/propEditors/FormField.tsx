import "./form_field.less";

import * as React from "react";
import { classes } from "../../uiShell/utils";

interface Props {
    className?: string
    style?: React.CSSProperties
    name: string
    assigned?: boolean
    oneLine?: boolean
}

export const FormField:React.SFC<Props> = (props) => {

    return (
        <div className={classes(
            "column", 
            "form-field", 
            props.assigned && "assigned",
            props.oneLine && "one-line",
            props.className)}
            style={props.style}>
            <div className="title">{props.name}</div>
            <div className="body">{props.children}</div>
        </div>
    );
}


