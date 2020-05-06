import * as React from "react";
import { shallowEqual, useDispatch } from "react-redux";

import { useActivePanelState } from "./core/uiState/ideState";
import { WheelItem, Wheel } from "./uiShell/controls/Wheel";
import { SelectedElementField } from "./SelectedElementField";
import { ElementInsertSection } from "./ElementInsertSection";
import { ElementUpdateSection } from "./ElementUpdateSection";
import { ElementListSection } from "./ElementListSection";
import { useDocEditorState } from "./patterns/docEditor/docEditorHooks";
import { DocEditorState, selectionChanged } from "./patterns/docEditor/docEditorState";
import { DocState, DocSelection, PropEditorFactory } from "./core/doc/docModels";
import { MenuItem } from "./uiShell/controls/MenuItem";
import { FormField } from "./uiShell/controls/FormField";

interface Props {
    propEditorFactory: PropEditorFactory
}

export const ComponentViewEditorSection:React.SFC<Props> = (props) => {
    const [editMode, setEditMode] = useActivePanelState("editMode", false);
    const { allElements, elements, component } = useDocEditorState((s: DocEditorState<DocState, DocSelection>) => {
        const selection = s.present.selection;
        const c = s.preview.components.byName[selection.component];
        return {
            allElements: c.elements.all,
            ...selection
        };
    }, shallowEqual);
    const dispatch = useDispatch();

    const editModeSetter = (mode: string) => 
        () => {
            setEditMode(mode);
        }

    const handleChange = (elements:string[]) => {
        dispatch(selectionChanged({ elements }));
    }

    return (
        <>
            <div className="column separator-collapse palette-3 edge-bottom">
                <div className="scale-3 row pdl-4" key="l1">
                    
                    <SelectedElementField
                        key="elements"
                        className="stretch"
                        allElements={allElements}
                        value={elements}
                        onChange={handleChange} />
                    
                </div>
                

                <div className="scale-3 row" key="l2">
                    
                    <MenuItem 
                        key="create"
                        className="highlight-none"
                        selected={editMode == "create"}
                        onClick={editModeSetter("create")}
                        label="Add Element" icon="plus" name="addElement" />
                    
                    <MenuItem 
                        key="edit" 
                        className="highlight-none"
                        onClick={editModeSetter("edit")}
                        selected={editMode == "edit"}
                        label="Properties" icon="edit" name="editElement" />
                    
                    <MenuItem 
                        key="elements" 
                        className="highlight-none"
                        onClick={editModeSetter("elements")}
                        selected={editMode == "elements"}
                        label="Elements" icon="sitemap" name="elements" />

                </div>
            </div>

            {(editMode == "create") && <ElementInsertSection />}
                
            {(editMode == "edit") && <ElementUpdateSection 
                                        renderPropEditor={props.propEditorFactory} 
                                        component={component} 
                                        elementIds={elements} />}

            {(editMode == "elements") && <ElementListSection />}

        </>
    );
}