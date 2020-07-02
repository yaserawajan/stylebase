import * as React from "react";

import { Layout } from "../uiShell/Layout";
import { ComponentEditorPanel } from "./ComponentEditorPanel";
import { useActivePanelState } from "./uiState/ideState";
import { ComponentView } from "./ComponentView";
import { PropEditorFactory } from "./doc/docModels";
import { DocSelection } from "./doc/state/stateModels";
import { AppToolbarEdit } from "./AppToolbarEdit";
import { useDocSelectionState } from "../patterns/docEditor/docEditorHooks";
import { DocumentEditorPanel } from "./DocumentEditorPanel";
import { Title } from "../uiShell/controls/Title";
import { Divider, Stretcher } from "../uiShell/controls";

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
            renderPanel={(panelName, specs) => {
                switch (panelName) {

                    case "docNavigator": return <DocumentEditorPanel documentName="Document" style={specs.style} />;

                    case "componentEditor": return (
                            <ComponentEditorPanel 
                                propEditorFactory={props.propEditorFactory} 
                                component={component} style={specs.style} />
                        );

                    default: return <div style={specs} />;
                }
            }}
            renderLogo={() => <Title>S T Y L E B A S E</Title>}
            renderToolbarElements={
                () => (
                    <>
                        <Stretcher />
                        <Divider />
                        <AppToolbarEdit component={component} elements={elements} />
                    </>
                )}

            renderView={(_, rect) => (<ComponentView key="adv" rect={rect} component={component} elements={elements} />)}

            onLeftPanelSelection={setLeftPanel}
            onRightPanelSelection={setRightPanel} />

    );
}