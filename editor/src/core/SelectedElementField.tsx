import * as React from "react";

import { SelectionCarousel } from "../uiShell/controls/SelectionCarousel";
import { classes } from "../uiShell/utils";
import { FormField } from "../uiShell/controls/FormField";


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
            <FormField name="Selected Element(s)" className={className}>
                    <SelectionCarousel
                        key="elementSel"
                        allValues={allElements}
                        value={value[0]}
                        onChange={handleChange} />
            </FormField>
        );
    }
    else return <div className={className}>({value.length}) Elements</div>
}