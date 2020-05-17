import * as React from "react";

import { FontFamily } from "../../types";
import { InputIcon } from "../../../uiShell/controls/InputIcon";
import { InputArea } from "../../../uiShell/controls/InputArea";
import { FontSwatch } from "./FontSwatch";
import { FontFamilyExplorer } from "./FontFamilyExplorer";
import { Row } from "../../../uiShell/layouts";
import { FolderHandleIcon } from "../../../uiShell/controls/FolderHandleIcon";

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

            <Row onClick={handleClick} key="header">

                <FontSwatch 
                    style={{ padding: "0 0.2em" }}
                    weight={400}
                    letterSpacing={0} 
                    italic={false} 
                    smallCaps={false} 
                    family={props.value} className="stretch" />

                <InputIcon>
                    <FolderHandleIcon toggled={toggled} />
                </InputIcon>
                
            </Row>

            {toggled &&
                <Row key="body">
                    
                    <FontFamilyExplorer className="stretch" value={props.value} onChange={props.onChange} />
                    
                </Row>
            }

        </InputArea>
    )
}