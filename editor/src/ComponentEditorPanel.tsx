import * as React from "react";
import { Panel } from "./uiShell/panel/Panel";
import { Title } from "./uiShell/controls/Title";
import { TabSelector } from "./uiShell/controls/TabSelector";
import { Tab } from "./uiShell/controls/Tab";
import { useActivePanelState } from "./uiState/ideState";
import { Command } from "./uiShell/controls/Command";
import { Wheel, WheelItem } from "./uiShell/controls/Wheel";
import { ComponentViewEditorSection } from "./ComponentViewEditorSection";
import { ComponentMetadataSection } from "./ComponentMetadataSection";
import { IconLA } from "./uiShell/IconLA";
import { PropEditorFactory } from "./doc/docModels";



interface Props {
    component: string
    style: React.CSSProperties
    propEditorFactory: PropEditorFactory
}

export const ComponentEditorPanel:React.SFC<Props> = (props) => {

    const [componentEditMode, setComponentEditMode] = useActivePanelState("componentEditMode", false);
    

    return (
        <Panel key="cvep" style={props.style}>

            <div className="l1 row" key="l1">
                <Title>
                    <IconLA icon="microchip" />
                    &nbsp;{props.component}
                </Title>
                <div className="stretch" />
                <TabSelector key="tabs" value={componentEditMode} onChange={setComponentEditMode}>
                    <Tab key="design" name="design">
                        <Command label="Design Editor" icon="palette" name="toggleDesign" />
                    </Tab>
                    <Tab key="metadata" name="metadata">
                        <Command label="Metadata Editor" icon="list" name="toggleMetadata" />
                    </Tab>
                </TabSelector>
            </div>
            
            <Wheel key="componentEditMode" value={componentEditMode}>
                <WheelItem key="design" name="design">
                    <ComponentViewEditorSection propEditorFactory={props.propEditorFactory} />
                </WheelItem>
                <WheelItem key="metadata" name="metadata">
                    <ComponentMetadataSection />
                </WheelItem>
            </Wheel>

        </Panel>
    );
}