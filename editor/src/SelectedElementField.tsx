import * as React from "react";

import { DropDownList } from "./uiShell/controls/DropDownList";


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
            <DropDownList
                className={className}
                key="elementSel"
                label="Element" 
                allValues={allElements}
                value={value[0]}
                onChange={handleChange} />
        );
    }
    else return <div className={className}>({value.length}) Elements</div>
}