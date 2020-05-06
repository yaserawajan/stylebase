import * as React from "react";

import { classes } from "../../../uiShell/utils";
import { FontFamily } from "../../types";
import { InputIcon } from "../../../uiShell/controls/InputIcon";
import { InputArea } from "../../../uiShell/controls/InputArea";
import { FontSwatch } from "./FontSwatch";
import { FontFamilyExplorer } from "./FontFamilyExplorer";
import { IconLA } from "../../../uiShell/controls/IconLA";

interface Props {
    className?: string
    style?: React.CSSProperties
    value: FontFamily
    onChange: (value: FontFamily) => void
    placeholder?: React.ReactNode
    disabled?: boolean
}

export const FontFamilySelector:React.SFC<Props> = (props) => {

    const [toggled, setToggled] = React.useState(false);

    const handleClick = () => {
        setToggled(state => !state);
    }

    return (
        <InputArea className={props.className} style={props.style} tabIndex={0}>

            <div className="row" onClick={handleClick}>

                <FontSwatch 
                    weight={400}
                    letterSpacing={0} 
                    italic={false} 
                    smallCaps={false} 
                    family={props.value} className="stretch" />

                <InputIcon>
                    <IconLA
                        icon="angle-right" 
                        className={classes("rotatable", toggled && "rotate-90-cw")} />
                </InputIcon>
            </div>

            {toggled &&
                <div className="row">
                    
                    <FontFamilyExplorer className="stretch" value={props.value} onChange={props.onChange} />
                    
                </div>
            }

        </InputArea>
    )
}