
import * as React from "react";
import { classes } from "../utils";

interface Props {
    errorMessage?: string
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
        props.errorMessage && "error",
        props.className);

    return (
        <label className={classList} style={props.style}>
            <div className="label">
                {
                    props.errorMessage 
                        ? <span>{props.errorMessage}</span>
                        : <span>{props.name}</span>
                }
            </div>
            <div className="body">{props.children}</div>
        </label>
    );
}


