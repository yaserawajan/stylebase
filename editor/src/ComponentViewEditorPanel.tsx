import * as React from "react";
import { Panel } from "./uiShell/panel/Panel";
import { Title } from "./uiShell/controls/Title";
import { Header } from "./uiShell/controls/Header";
import { DropDownList } from "./uiShell/controls/DropDownList";
import { TabSelector } from "./uiShell/controls/TabSelector";
import { Tab } from "./uiShell/controls/Tab";
import { useActivePanelState } from "./uiState/ideState";
import { ElementUpdateSection } from "./ElementUpdateSection";
import { ElementInsertSection } from "./ElementInsertSection";
import { useDocSelectionState } from "./docEditor/docEditorSelectors";
import { DocSelection } from "./doc/docState";
import { SelectedElementField } from "./uiShell/SelectedElementField";

interface Props {

    style: React.CSSProperties
}

export const ComponentViewEditorPanel:React.SFC<Props> = (props) => {

    

    const [editMode, setEditMode] = useActivePanelState("editMode", false);

    return (
        <Panel key="cvep" style={props.style}>
            <Title>View Editor</Title>
            <Header>
                <div className="row pt2 ph2">
                    
                    <SelectedElementField />

                    <div className="stretch" />
                    
                    <TabSelector key="tabs" 
                        style={{marginLeft: 20 }} 
                        value={editMode} 
                        onChange={setEditMode}>
                        <Tab key="edit" name="edit" icon="edit" />
                        <Tab key="create" name="create" icon="plus" />
                    </TabSelector>
                </div>
            </Header>
            {(editMode == "edit") && <ElementUpdateSection />}
            {(editMode == "create") && <ElementInsertSection />}
        </Panel>
    );
}