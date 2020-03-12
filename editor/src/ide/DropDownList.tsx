import * as React from "react";
import { IconLA } from "./IconLA";

interface Props {
    style?: React.CSSProperties
    label: string
    isToggled: boolean
    onToggle?: (name:string) => void
    value: string
    onChange?: (value: string, name: string) => void
}

export const DropDownList:React.SFC<Props> = (props) => {

    return (
        <div style={props.style} className="control">
            <div className="control-header">
                <div className="control-label">
                    {props.label}
                </div>
                <div className="control-input">
                    <IconLA className="control-icon" size="fa-1x" icon="angle-left" />
                    <div className="control-input-value">
                        {props.value}
                    </div>
                    <IconLA className="control-icon" size="fa-lx" icon="angle-right" />
                </div>
            </div>
            {props.isToggled? <div className="control-assistant">
                {props.children}
            </div> : null}
        </div>
    );
}

