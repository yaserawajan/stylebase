import * as React from "react";
import { useDocSelectionState } from "../docEditor/docEditorSelectors";
import { DocSelection } from "../doc/docState";
import { DropDownList } from "./controls/DropDownList";

interface Props {
    
}

export const SelectedElementField:React.SFC<Props> = (props) => {


    const selection = useDocSelectionState<DocSelection>();

    return (
        <DropDownList
            key="element"
            isToggled={false} 
            label="Element" 
            value={selection.elements[0] || ""} />
    );
}