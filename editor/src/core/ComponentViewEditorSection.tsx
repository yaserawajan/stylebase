import * as React from "react";
import { shallowEqual, useDispatch } from "react-redux";

import { useActivePanelState } from "./uiState/ideState";
import { WheelItem, Wheel } from "../uiShell/controls/Wheel";
import { SelectedElementField } from "./SelectedElementField";
import { ElementInsertSection } from "./ElementInsertSection";
import { ElementUpdateSection } from "./ElementUpdateSection";
import { ElementListSection } from "./ElementListSection";
import { useDocEditorState } from "../patterns/docEditor/docEditorHooks";
import { DocEditorState, selectionChanged } from "../patterns/docEditor/docEditorState";
import { DocState, DocSelection, PropEditorFactory } from "./doc/docModels";
import { MenuItem } from "../uiShell/controls/MenuItem";
import { FormField } from "../uiShell/controls/FormField";
import { Button } from "../uiShell/controls/Button";
import { Title } from "../uiShell/controls/Title";

interface Props {
    propEditorFactory: PropEditorFactory
}

export const ComponentViewEditorSection:React.SFC<Props> = (props) => {
    
    const { allElements, elements, component } = useDocEditorState((s: DocEditorState<DocState, DocSelection>) => {
        const selection = s.present.selection;
        const c = s.preview.components.byName[selection.component];
        return {
            allElements: c.elements.all,
            ...selection
        };



    }, shallowEqual);
    const dispatch = useDispatch();

    const setSelection = (elements:string[]) => {
        dispatch(selectionChanged({ elements }));
    }

    return (
        <>
            <div className="column separator-collapse edge-bottom">

                <div key="l3" className="scale-2 row row-indent-2 palette-3">
                    <Title>Properties</Title>
                    <div className="stretch" />
                    <Title secondary style={{ fontFamily: "monospace" }}>Box</Title>
                </div>

                <div className="scale-3 row-indent-2 palette-3" key="l1">
                    <SelectedElementField
                        key="elements"
                        className="stretch"
                        allElements={allElements}
                        value={elements}
                        onChange={setSelection} />
                    
                </div>
            </div>

            <ElementUpdateSection 
                renderPropEditor={props.propEditorFactory} 
                component={component} 
                elementIds={elements} />
        </>
    );
}