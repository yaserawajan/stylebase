import * as React from "react";
import { Panel } from "./uiShell/panel/Panel";
import { Title } from "./uiShell/controls/Title";
import { Header } from "./uiShell/controls/Header";
import { DropDownList } from "./uiShell/controls/DropDownList";
import { TabSelector } from "./uiShell/controls/TabSelector";
import { Tab } from "./uiShell/controls/Tab";
import { SectionLineGroup } from "./uiShell/SectionLineGroup";
import { SectionLine } from "./uiShell/SectionLine";

interface Props {
    style: React.CSSProperties
}

export const ComponentViewEditorPanel:React.SFC<Props> = (props) => {

    return (
        <Panel key="cvep" style={props.style}>
            <Title>Box Editor</Title>
            <Header>
                <div className="row pt2 ph2">
                    <DropDownList
                        className="stretch" 
                        isToggled={false} 
                        label="Element" 
                        value="title" />
                    
                    <TabSelector style={{marginLeft: 20 }} value={"edit"} onChange={() => {}}>
                        <Tab name="edit" icon="edit" />
                        <Tab name="create" icon="plus" />
                    </TabSelector>
                </div>
            </Header>
            <Header>
                <div className="ph2">
                    
                            <TabSelector value={"allProps"} onChange={() => {}}>
                                <Tab name="allProps" label="Properties" />
                                <Tab name="typographyProps" label="Typography" />
                                <Tab name="skinProps" label="Colours" />
                            </TabSelector>
                    
                </div>
            </Header>
            
            <div className="scroll-area">
                <div className="p3">
                    <SectionLineGroup title="Padding">
                        <SectionLine>Top</SectionLine>
                        <SectionLine>Right</SectionLine>
                        <SectionLine>Bottom</SectionLine>
                        <SectionLine>Left</SectionLine>
                    </SectionLineGroup>
                    
                    <SectionLineGroup title="Margins">
                        <SectionLine>Top</SectionLine>
                        <SectionLine>Right</SectionLine>
                        <SectionLine>Bottom</SectionLine>
                        <SectionLine>Left</SectionLine>
                    </SectionLineGroup>
                </div>
                
            </div>
        </Panel>
    );
}