import * as React from "react";

import { Layout } from "../uiShell/Layout";
import { ComponentEditorPanel } from "./ComponentEditorPanel";
import { useActivePanelState } from "./uiState/ideState";
import { AppDocumentView } from "./AppDocumentView";
import { PropEditorFactory, DocSelection } from "./doc/docModels";
import { AppToolbarEdit } from "./AppToolbarEdit";
import { useDocSelectionState } from "../patterns/docEditor/docEditorHooks";

interface Props {
    propEditorFactory: PropEditorFactory
}   

export const App:React.SFC<Props> = (props) => {

    const [leftPanel, setLeftPanel] = useActivePanelState("left");

    const [rightPanel, setRightPanel] = useActivePanelState("right");

    const { component, elements } = useDocSelectionState<DocSelection>();

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
                                component={component} style={rect} />
                        );
                    default: return <div style={rect} />;
                }
            }}
            renderLogo={() => <span style={{ marginLeft: 10, fontSize: "0.3em", display: "block" }}>S T Y L E B A S E</span>}
            renderToolbarElements={
                () => (
                    <>
                        <div key="d1" className="stretch" />
                        <div key="d2" className="divider" />
                        <AppToolbarEdit component={component} elements={elements} />
                    </>
                )}

            renderView={(_, rect) => (<AppDocumentView key="adv" rect={rect} component={component} elements={elements} />)}

            onLeftPanelSelection={setLeftPanel}
            onRightPanelSelection={setRightPanel} />

    );
}