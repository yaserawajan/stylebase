import * as React from "react";
import { Panel } from "../uiShell/panel/Panel";
import { useActivePanelState } from "./uiState/ideState";
import { ComponentViewEditorSection } from "./ComponentViewEditorSection";
import { ComponentMetadataSection } from "./metadata/ComponentMetadataSection";
import { PropEditorFactory } from "./doc/docModels";
import { MenuItem } from "../uiShell/controls/MenuItem";
import { Title } from "../uiShell/controls/Title";
import { ElementListSection } from "./ElementListSection";
import { ElementInsertSection } from "./ElementInsertSection";
import { COMPONENT_EDITOR_TAB_KEY, componentEditorTabs } from "./constants";



interface Props {
    component: string
    style: React.CSSProperties
    propEditorFactory: PropEditorFactory
}

export const ComponentEditorPanel:React.SFC<Props> = (props) => {

    const [componentEditMode, setComponentEditMode] = useActivePanelState(COMPONENT_EDITOR_TAB_KEY, false);
    
    const editModeSetter = (value: string) => 
        () => {
            setComponentEditMode(value);
        }

    return (
        <Panel key="cvep" style={props.style}>

            <div className="palette-3 dark scale-1 row-indent-1 edge-bottom" key="l1">

                <Title icon="microchip">{props.component}</Title>

            </div>

            <div key="menu" className="palette-4 dark scale-2 row">

                <MenuItem 
                    key={componentEditorTabs.add}
                    selected={componentEditMode == componentEditorTabs.add}
                    onClick={editModeSetter(componentEditorTabs.add)} label="Add" icon="plus" />
                
                <MenuItem 
                    key={componentEditorTabs.adjust} 
                    selected={componentEditMode == componentEditorTabs.adjust}
                    onClick={editModeSetter(componentEditorTabs.adjust)} label="Adjust" icon="edit" />
                
                <MenuItem 
                    key={componentEditorTabs.elements}
                    onClick={editModeSetter(componentEditorTabs.elements)}
                    selected={componentEditMode == componentEditorTabs.elements} label="Elements" icon="sitemap" />

                <MenuItem 
                    key={componentEditorTabs.metadata} 
                    selected={componentEditMode == componentEditorTabs.metadata}
                    onClick={editModeSetter(componentEditorTabs.metadata)} label="Metadata" icon="list" />

            </div>
            
            {(componentEditMode == componentEditorTabs.add) && <ElementInsertSection />}

            {(componentEditMode == componentEditorTabs.adjust) && <ComponentViewEditorSection propEditorFactory={props.propEditorFactory} />}
            
            {(componentEditMode == componentEditorTabs.elements) && <ElementListSection />}

            {(componentEditMode == componentEditorTabs.metadata) && <ComponentMetadataSection componentName={props.component} /> }

            
 
        </Panel>
    );
}