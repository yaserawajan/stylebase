import * as React from "react";
import { shallowEqual, useDispatch } from "react-redux";

import { useDocEditorState } from "./docEditor/docEditorSelectors";
import { DocSelection, DocState } from "./doc/docState";
import { DropDownList } from "./uiShell/controls/DropDownList";
import { DocEditorState, selectionChanged } from "./docEditor/docEditorState";
import { ComponentUri } from "./doc/docMetadata";

interface Props {
    className?: string
}

const formatType = ({ component, lib }: ComponentUri) => `${component}`;

export const SelectedElementField:React.SFC<Props> = ({ className }) => {

    const { allElements, selectedElements, type } = useDocEditorState((s: DocEditorState<DocState, DocSelection>) => {
        const selection = s.present.selection;
        const c = s.preview.components.byName[selection.component];
        return {
                allElements: c.elements.all,
                selectedElements: selection.elements,
                type: selection.elements.length == 1
                    ? formatType(c.elements.byName[selection.elements[0]].type)
                    : "Selected Element(s)"
            }
    }, shallowEqual);
 
    const dispatch = useDispatch();

    const handleChange = (value: string) => {
        
        dispatch(selectionChanged({ elements: [value] }));
    }

    if (selectedElements.length < 2) {
        return (
            <DropDownList
                className={className}
                key="elementSel"
                label="Element" 
                allValues={allElements}
                value={selectedElements[0]}
                onChange={handleChange} />
        );
    }
    else return <div className={className}>({selectedElements.length}) Elements</div>
}