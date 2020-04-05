import * as React from "react";

import { Layout } from "./uiShell/Layout";
import { Section } from "./uiShell/controls/Section";
import { Command } from "./uiShell/controls/Command";
import { ComponentMetadataPanel } from "./ComponentMetadataPanel";
import { ComponentViewEditorPanel } from "./ComponentViewEditorPanel";
import { useActivePanelState } from "./uiState/ideState";
import { withPropsEditorMerger } from "./doc/withEditorPropsMerger";
import { Box } from "./componentCatalog/box/Box";
import { ComponentUri } from "./doc/docMetadata";
import { SelectedElementField } from "./uiShell/SelectedElementField";
import { AppDocumentView } from "./AppDocumentView";
import { DocLibCollection } from "./doc/docRenderUtils";


interface Props {
    libCollection: DocLibCollection
}   

export const App:React.SFC<Props> = (props) => {

    const [leftPanel, setLeftPanel] = useActivePanelState("left");
    const [rightPanel, setRightPanel] = useActivePanelState("right");
    
    return (
        <Layout 
            activeLeftPanel={leftPanel}
            activeRightPanel={rightPanel}
            leftPanels={[ "docNavigator"]}
            rightPanels={[ "componentViewEditor", "componentMetadata" ]}
            panelSpecs={{
                "docNavigator": {
                    icon: "bars",
                    label: "Document Navigator"
                },
                "componentMetadata": {
                    icon: "microchip",
                    label: "Component Metadata"
                },
                "componentViewEditor": {
                    icon: "shapes",
                    label: "Component View Editor"
                }
            }}
            renderPanel={(panelName, rect) => {
                switch (panelName) {
                    case "docNavigator": return <div style={rect} />;
                    case "componentMetadata": return <ComponentMetadataPanel style={rect} />;
                    case "componentViewEditor": return <ComponentViewEditorPanel style={rect} />;
                    default: return <div style={rect} />;
                }
            }}
            renderLogo={() => <span style={{ marginLeft: 10 }}>S T Y L E B A S E</span>}
            renderToolbarElements={
                () => (
                    <>
                        <SelectedElementField />
                        <div className="stretch" />
                        <Section key="edit">
                            <Command key="undo" name="undo" label="Undo" icon="undo" />
                            <Command key="redo" name="redo" label="Redo" icon="redo" />
                            <Command key="cut" name="cut" label="Cut" icon="cut" />
                            <Command key="copy" name="copy" label="Copy" icon="copy" />
                            <Command key="paste" name="paste" label="Paste" icon="paste" />
                        </Section>
                        <Section key="delete">
                            <Command name="delete" label="Delete" icon="trash" />
                        </Section>
                    </>
                )}

            renderView={(_, rect) => 
                <AppDocumentView 
                    libCollection={props.libCollection} 
                    rect={rect} />}

            onLeftPanelSelection={setLeftPanel}
            onRightPanelSelection={setRightPanel} />

    );
}