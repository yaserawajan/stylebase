import * as React from "react";
import { IconLA } from "./IconLA";

interface Props {
    disabled?: boolean
    label: string
    icon?: string
    onClick?: (name: string) => void
}

export const Command:React.SFC<Props> = (props) => {

    return (
        <div className="command">
            {props.icon? <IconLA className="command-icon" icon={props.icon} />: null}
            <div className="command-text">{props.label}</div>
        </div>
    );
}