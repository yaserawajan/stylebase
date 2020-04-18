import * as React from "react";
import { useActivePanelState } from "./uiState/ideState";
import { TabSelector } from "./uiShell/controls/TabSelector";
import { WheelItem, Wheel } from "./uiShell/controls/Wheel";
import { Tab } from "./uiShell/controls/Tab";
import { Command } from "./uiShell/controls/Command";
import { SelectedElementField } from "./SelectedElementField";
import { ElementInsertSection } from "./ElementInsertSection";
import { ElementUpdateSection } from "./ElementUpdateSection";
import { ElementListSection } from "./ElementListSection";
import { shallowEqual, useDispatch } from "react-redux";
import { useDocEditorState } from "./docEditor/docEditorHooks";
import { DocEditorState, selectionChanged } from "./docEditor/docEditorState";
import { DocState, DocSelection } from "./doc/docModels";

interface Props {
    
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

    const handleChange = (elements:string[]) => {
        dispatch(selectionChanged({ elements }));
    }

    return (
        <div className="column">
            <div className="l2 row" key="l2">
                <TabSelector key="tabs" value={editMode} onChange={setEditMode}>

                    <Tab key="create" name="create">
                        <Command label="Add Element" icon="plus" name="addElement" />
                    </Tab>
                    <Tab key="edit" name="edit">
                        <Command label="Metadata Editor" icon="edit" name="editElement" />
                    </Tab>
                    <Tab key="elements" name="elements" className="stretch">
                    
                        <SelectedElementField
                            className="stretch"
                            allElements={allElements}
                            value={elements}
                            onChange={handleChange} />
                    </Tab>
                    
                </TabSelector> 
            </div>
            
            <Wheel className="stretch" orientation="x" value={editMode}>
                
                <WheelItem name="create" key="create">
                    <ElementInsertSection />
                </WheelItem>

                <WheelItem name="edit" key="edit">
                    <ElementUpdateSection />
                </WheelItem>

                <WheelItem name="elements" key="elements">
                    <ElementListSection />
                </WheelItem>
            </Wheel>
        </div>
    );
}