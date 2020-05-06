
import * as React from "react";
import { classes } from "../utils";

interface Props {
    className?: string
    style?: React.CSSProperties
    name: string
    assigned?: boolean
    oneLine?: boolean
}

export const FormField:React.SFC<Props> = (props) => {

    const classList = classes(
        "form-field", 
        props.assigned && "assigned",
        props.oneLine && "one-line",
        props.className);

    return (
        <div className={classList} style={props.style}>
            <div className="title subtext">{props.name}</div>
            <div className="body">{props.children}</div>
        </div>
    );
}


