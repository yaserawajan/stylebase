import * as React from "react";
import { classes } from "../uiShell/utils";

interface Props {
    name: string
    assigned?: boolean
}

export const SimpleProp:React.SFC<Props> = (props) => {

    return (
        <div className={classes("column", "simple-prop", props.assigned? "assigned" : null)}>
            <div className="title">{props.name}</div>
            <div className="body">{props.children}</div>
        </div>
    );
}


