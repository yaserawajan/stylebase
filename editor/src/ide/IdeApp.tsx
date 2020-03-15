import * as React from "react";

import { NavBar } from "./navbar/NavBar";
import { Canvas } from "./canvas/Canvas";
import { Panel } from "./panel/Panel";
import { ArtifactTitle } from "./ArtifactTitle";
import { Toolbar } from "./toolbar/Toolbar";
import { Footer } from "./Footer"
import { ZoomControl } from "./canvas/ZoomControl";
import { SectionLine } from "./SectionLine";
import { SectionLineGroup } from "./SectionLineGroup";
import { SectionTree } from "./SectionTree";
import { DropDownList } from "./controls/DropDownList";
import { Section } from "./controls/Section";
import { Command } from "./controls/Command";
import { Menu } from "./controls/Menu";
import { TabSelector } from "./controls/TabSelector";
import { Tab } from "./controls/Tab";
import { Header } from "./controls/Header";

const navBarCss:React.CSSProperties = {
    position: "fixed",
    top: 0,
    left:0,
    right:0
};

type ToggleMap = {
    [k:string]: boolean
} 



type State = {
    leftToggled: boolean,
    panelSections: ToggleMap,
    selectedPanel: string,
    zoom: number
} 

export const IdeApp:React.SFC<{}> = ({}) => {
    
    const [state, setState] = React.useState<State>({
        leftToggled: true,
        zoom: 1,
        panelSections: {},
        selectedPanel: "props"
    });

    const handleLeftClick = () => {
        setState((state) => ({ ...state, leftToggled: !state.leftToggled }));
    }

    const handleRightPanelChange = (selectedPanel: string) => {
        setState((state) => ({ ...state, selectedPanel }));
    }

    const handleSectionToggle = (name: string) => {
        setState((state) => ({ ...state, panelSections: { ...state.panelSections, [name]: !state.panelSections[name] }}))
    }

    const handleZoomChange = (newValue: number) => {
        setState((state) => ({ ...state, zoom: newValue }));
    }

    return (
        <>
            <NavBar key="nb" style={navBarCss}>
                <div className="left">
                    <Section>
                        <Command key="lh" 
                            name="lp-toggle"
                            label="Toggle Left Panel"
                            icon="bars"
                            isToggled={state.leftToggled}
                            onClick={handleLeftClick} />
                    </Section>
                    <Section>
                        <span style={{marginLeft:10 }}>S T Y L E B A S E</span>
                    </Section>
                </div>

                <div className="right">
                    <Section />
                    <Section>
                        <TabSelector value={state.selectedPanel} onChange={handleRightPanelChange} allowNoSelection={true}>
                            <Tab name="props" icon="microchip" />
                            <Tab name="ce" icon="sitemap" />
                            <Tab name="user" icon="user" />
                        </TabSelector>
                    </Section>
                </div>
            </NavBar>


            <Panel appearFrom="left" key="lsp" isOpen={state.leftToggled} width={240} top={100}>
                
                <Section>
                    <Menu name="parameters" 
                        title="Parameters" 
                        isToggled={state.panelSections["parameters"]} 
                        onToggle={handleSectionToggle}>

                        <SectionTree>
                            <SectionLine>style</SectionLine>
                            <SectionLine>className</SectionLine>
                        </SectionTree>
                    </Menu>
                </Section>

                <Section>
                    <Menu name="states" 
                        title="Visual States" 
                        isToggled={state.panelSections["states"]} 
                        onToggle={handleSectionToggle}>
                        
                    </Menu>
                </Section>

                <Section>
                    <Menu name="dataSample" 
                        title="Data Sample" 
                        subtitle="None"
                        isToggled={state.panelSections["dataSample"]} 
                        onToggle={handleSectionToggle}>
                        
                    </Menu>
                </Section>

                
            </Panel>

            <Panel title="Properties" appearFrom="right" key="rsp" isOpen={state.selectedPanel == "props"} width={240} top={50}>
                <Header />
                <Section>
                    
                    <Menu name="children" 
                        title="Children" 
                        subtitle="None"
                        isToggled={state.panelSections["children"]} onToggle={handleSectionToggle}>
                        
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

                    </Menu>
                </Section>
            </Panel>
            
            <Panel title="Children Explorer" appearFrom="right" key="ce-panel" isOpen={state.selectedPanel == "ce"} width={240} top={50}></Panel>
            
            <Panel title="Editor Preferences" appearFrom="right" key="settings-panel" isOpen={state.selectedPanel == "settings"} width={240} top={50}></Panel>
            
            <ArtifactTitle style={{ position: "fixed", left: 0, top: 50, width: 240 }}  />


            <Toolbar key="ct" top={50} left={240} right={state.selectedPanel? 240: 0} thickness={50}>
                <div className="left">
                    <DropDownList
                        style={{ minWidth: 120, maxWidth: 200 }} 
                        isToggled={false} 
                        label="State Tags" value="toggled" />
                </div>
                <div className="right">
                    <Section>
                        <Command name="pointer" label="pointer" icon="mouse-pointer" />
                        <Command name="shapes" label="Components" icon="shapes" />
                    </Section>
                    <Section>
                        <Command name="undo" label="Undo" icon="undo" />
                        <Command name="redo" label="Redo" icon="redo" />
                        <Command name="cut" label="Cut" icon="cut" />
                        <Command name="copy" label="Copy" icon="copy" />
                        <Command name="paste" label="Paste" icon="paste" />
                    </Section>
                </div>
            </Toolbar>

            <Canvas key="canvas" 
                zoom={state.zoom}
                top={100} 
                left={state.leftToggled? 240: 0} 
                bottom={40} 
                right={state.selectedPanel? 240: 0} />

            <Footer key="cf" bottom={0} left={state.leftToggled? 240: 0} right={state.selectedPanel? 240: 0} thickness={40}>
                <ZoomControl value={state.zoom} onChange={handleZoomChange} style={{  }} />
            </Footer>
        </>
    );
}