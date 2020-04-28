import * as React from "react";

import { Layout } from "./uiShell/Layout";
import { ComponentEditorPanel } from "./ComponentEditorPanel";
import { useActivePanelState } from "./core/uiState/ideState";
import { AppDocumentView } from "./AppDocumentView";
import { PropEditorFactory } from "./core/doc/docModels";
import { AppToolbarEdit } from "./AppToolbarEdit";

interface Props {
    propEditorFactory: PropEditorFactory
}   

export const App:React.SFC<Props> = (props) => {

    const [leftPanel, setLeftPanel] = useActivePanelState("left");

    const [rightPanel, setRightPanel] = useActivePanelState("right");



    return (
        <Layout 
            activeLeftPanel={leftPanel}
            activeRightPanel={rightPanel}
            floatingPanels={[]}
            leftPanels={[ "docNavigator" ]}
            rightPanels={[ "componentEditor" ]}
            panelSpecs={{
                "docNavigator": { icon: "bars", label: "Document Navigator" },
                "componentEditor": { icon: "microchip", label: "Component Editor" }
            }}
            renderPanel={(panelName, rect) => {
                switch (panelName) {
                    case "docNavigator": return <div style={rect} />;
                    case "componentEditor": return (
                            <ComponentEditorPanel 
                                propEditorFactory={props.propEditorFactory} 
                                component="Component1" style={rect} />
                        );
                    default: return <div style={rect} />;
                }
            }}
            renderLogo={() => <span className="font-m" style={{ marginLeft: 10, display: "block" }}>S T Y L E B A S E</span>}
            renderToolbarElements={
                () => (
                    <>
                        <div key="d1" className="stretch" />
                        <div key="d2" className="divider" />
                        <AppToolbarEdit />
                    </>
                )}

            renderView={(_, rect) => (<AppDocumentView key="adv" rect={rect} />)}

            onLeftPanelSelection={setLeftPanel}
            onRightPanelSelection={setRightPanel} />

    );
}