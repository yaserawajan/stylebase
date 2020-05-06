import * as React from "react";
import { Panel } from "./uiShell/panel/Panel";
import { useActivePanelState } from "./core/uiState/ideState";
import { ComponentViewEditorSection } from "./ComponentViewEditorSection";
import { ComponentMetadataSection } from "./ComponentMetadataSection";
import { IconLA } from "./uiShell/controls/IconLA";
import { PropEditorFactory } from "./core/doc/docModels";
import { MenuItem } from "./uiShell/controls/MenuItem";



interface Props {
    component: string
    style: React.CSSProperties
    propEditorFactory: PropEditorFactory
}

export const ComponentEditorPanel:React.SFC<Props> = (props) => {

    const [componentEditMode, setComponentEditMode] = useActivePanelState("componentEditMode", false);
    
    const editModeSetter = (value: string) => 
        () => {
            setComponentEditMode(value);
        }

    return (
        <Panel key="cvep" style={props.style}>

            <div className="palette-3 dark scale-1 row pdl-2 edge-bottom" key="l1">

                <div className="text row">
                    <IconLA icon="microchip" />
                    &nbsp;
                    {props.component}
                </div>

                <div className="stretch" />

                

            </div>

            <div key="menu" className="palette-4 dark scale-2 row">
                <MenuItem 
                    key="design" 
                    selected={componentEditMode == "design"}
                    onClick={editModeSetter("design")} label="Design" icon="palette" name="toggleDesign" />
                
                <MenuItem 
                    key="metadata" 
                    selected={componentEditMode == "metadata"}
                    onClick={editModeSetter("metadata")} label="Metadata" icon="list" name="toggleMetadata" />
            </div>
            
            {(componentEditMode == "design") && <ComponentViewEditorSection propEditorFactory={props.propEditorFactory} />}
            
            {(componentEditMode == "metadata") && <ComponentMetadataSection /> }

 
        </Panel>
    );
}