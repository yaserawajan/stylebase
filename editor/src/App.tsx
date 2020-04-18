import * as React from "react";

import { Layout } from "./uiShell/Layout";
import { Section } from "./uiShell/controls/Section";
import { Command } from "./uiShell/controls/Command";
import { ComponentEditorPanel } from "./ComponentEditorPanel";
import { useActivePanelState } from "./uiState/ideState";
import { AppDocumentView } from "./AppDocumentView";

interface Props {
    
}   

export const App:React.SFC<Props> = (props) => {

    const [leftPanel, setLeftPanel] = useActivePanelState("left");

    const [rightPanel, setRightPanel] = useActivePanelState("right");



    return (
        <Layout 
            activeLeftPanel={leftPanel}
            activeRightPanel={rightPanel}
            leftPanels={[ "docNavigator" ]}
            rightPanels={[ "componentEditor" ]}
            panelSpecs={{
                "docNavigator": { icon: "bars", label: "Document Navigator" },
                "componentEditor": { icon: "microchip", label: "Component Editor" }
            }}
            renderPanel={(panelName, rect) => {
                switch (panelName) {
                    case "docNavigator": return <div style={rect} />;
                    case "componentEditor": return <ComponentEditorPanel component="Component1" style={rect} />;
                    default: return <div style={rect} />;
                }
            }}
            renderLogo={() => <span className="font-m" style={{ marginLeft: 10, display: "block" }}>S T Y L E B A S E</span>}
            renderToolbarElements={
                () => (
                    <>
                        <div key="d1" className="stretch" />
                        <div key="d2" className="divider" />
                        <Section>
                            <Command key="undo" name="undo" label="Undo" icon="undo" />
                            <Command key="redo" name="redo" label="Redo" icon="redo" />
                            <Command key="cut" name="cut" label="Cut" icon="cut" />
                            <Command key="copy" name="copy" label="Copy" icon="copy" />
                            <Command key="paste" name="paste" label="Paste" icon="paste" />
                            <Command key="delete" name="delete" label="Delete" icon="trash" />
                        </Section>
                    </>
                )}

            renderView={(_, rect) => (<AppDocumentView key="adv" rect={rect} />)}

            onLeftPanelSelection={setLeftPanel}
            onRightPanelSelection={setRightPanel} />

    );
}