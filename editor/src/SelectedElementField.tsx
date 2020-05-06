import * as React from "react";

import { DropDownList } from "./uiShell/controls/DropDownList";
import { classes } from "./uiShell/utils";


interface Props {
    className?: string
    value: string[]
    allElements: string[]
    onChange: (value: string[]) => void
}



export const SelectedElementField:React.SFC<Props> = ({ className, value, onChange, allElements }) => {

    const handleChange = (newValue: string) => {
        onChange([newValue]);
    }

    if (value.length < 2) {
        return (
            <div className={classes("row", className)}>
                <div className="text caption">Element</div>
                
                <DropDownList
                    className="stretch"
                    key="elementSel"
                    label="Element" 
                    allValues={allElements}
                    value={value[0]}
                    onChange={handleChange} />
                
            </div>
        );
    }
    else return <div className={className}>({value.length}) Elements</div>
}