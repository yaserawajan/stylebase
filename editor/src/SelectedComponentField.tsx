import * as React from "react";
import { shallowEqual, useDispatch } from "react-redux";

import { useDocEditorState } from "./docEditor/docEditorSelectors";
import { DocSelection, DocState } from "./doc/docState";
import { DropDownList } from "./uiShell/controls/DropDownList";
import { DocEditorState, selectionChanged } from "./docEditor/docEditorState";

interface Props {
    style?: React.CSSProperties
    className?: string
}


export const SelectedComponentField:React.SFC<Props> = ({ className, style }) => {

    const { component, allComponents } = useDocEditorState((s: DocEditorState<DocState, DocSelection>) => {
        const { component } = s.present.selection;
        return {
            allComponents: s.preview.components.all,
            component
        }
    }, shallowEqual);
 
    const dispatch = useDispatch();

    const handleChange = (value: string) => {
        dispatch(selectionChanged({ component: value }));
    }

    return <DropDownList 
        style={style}
        className={className}
        allValues={allComponents} 
        value={component} 
        onChange={handleChange}
        label="Component" />
}