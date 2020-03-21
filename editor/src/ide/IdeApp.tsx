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
import { Title } from "./controls/Title";
import { OptionSelector } from "./state/option/OptionSelector";
import { useSelector } from "react-redux";
import { IdeState } from "./state/ideState";
import { Toggler } from "./state/toggle/Toggler";



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
    
    zoom: number
} 

export const IdeApp:React.SFC<{}> = ({}) => {
    
    const [state, setState] = React.useState<State>({
        zoom: 1,
    });
    
    const showLeftPanel = useSelector<IdeState,boolean>(s => s.toggles["leftSidePanel"])
    const selectedRightPanel = useSelector<IdeState,string>(s => s.options["rightSidePanel"]);

    
    const handleZoomChange = (newValue: number) => {
        setState((state) => ({ ...state, zoom: newValue }));
    }

    return (
        <>
            <NavBar key="nb" style={navBarCss}>
                <div className="left">
                    <Section>
                        <Toggler subject="leftSidePanel">
                            {({ toggle, isToggled }) =>
                                <Command key="lh" 
                                    name="lp-toggle"
                                    label="Toggle Left Panel"
                                    icon="bars"
                                    isToggled={isToggled}
                                    onClick={toggle} />
                            }
                        </Toggler>
                    </Section>
                    <Section>
                        <span style={{ marginLeft: 10 }}>S T Y L E B A S E</span>
                    </Section>
                </div>

                <div className="right">
                    <Section />
                    <Section>
                        <OptionSelector subject="rightSidePanel" allowNone={true}>
                            {({ value, setValue }) => 
                                <TabSelector value={value} onChange={setValue}>
                                    <Tab name="props" icon="microchip" />
                                    <Tab name="ce" icon="sitemap"  />
                                </TabSelector>
                            }
                        </OptionSelector>
                    </Section>
                    <Section>
                        <Command label="User" name="user" icon="user" />
                    </Section>
                </div>
            </NavBar>


            <Panel appearFrom="left" key="lsp" isOpen={showLeftPanel} width={240} top={100}>

                <Title>Component Specs</Title>
                
                <Toggler subject="parameters">
                    {({ toggle, isToggled }) =>
                        <Menu name="parameters" 
                            title="Parameters" 
                            isToggled={isToggled} 
                            onToggle={toggle}>
                            <SectionTree>
                                <SectionLine>style</SectionLine>
                                <SectionLine>className</SectionLine>
                            </SectionTree>
                        </Menu>
                    }
                </Toggler>
            
                <Toggler subject="states">
                    {({ toggle, isToggled }) =>
                        <Menu name="states" 
                            title="Visual States" 
                            isToggled={isToggled} 
                            onToggle={toggle}>
                        </Menu>
                    }
                </Toggler>
            
                <Toggler subject="dataSamples">
                    {({ toggle, isToggled }) =>
                        <Menu name="dataSample" 
                            title="Data Sample" 
                            isToggled={isToggled} 
                            onToggle={toggle}>
                            
                        </Menu>
                    }
                    
                </Toggler>

                <Toggler subject="componentLib">
                    {({ toggle, isToggled }) =>
                        <Menu name="componentLib"
                            title="Component Library"
                            isToggled={isToggled}
                            onToggle={toggle}>
                            
                        </Menu>
                    }
                </Toggler>

            </Panel>

            <Panel appearFrom="right" key="rsp" isOpen={selectedRightPanel == "props"} width={240} top={50}>
                <Title>Box Editor</Title>
                <Header>
                    
                    <div className="row pv2 ph2">
                        <DropDownList
                            className="stretch" 
                            isToggled={false} 
                            label="Element" 
                            value="title" />
                        <OptionSelector subject="editMode">
                            {({ value, setValue }) => 
                                <TabSelector style={{marginLeft: 20 }} value={value} onChange={setValue}>
                                    <Tab name="edit" icon="edit" />
                                    <Tab name="create" icon="plus" />
                                </TabSelector>
                            }
                        </OptionSelector>
                    </div>
                    
                    <div className="ph2">
                        <OptionSelector subject="propsTab">
                            {({ value, setValue }) => 
                                <TabSelector value={value} onChange={setValue}>
                                    <Tab name="allProps" label="Properties" />
                                    <Tab name="typographyProps" label="Typography" />
                                    <Tab name="skinProps" label="Colours" />
                                </TabSelector>
                            }
                        </OptionSelector>
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
            
            <Panel appearFrom="right" key="explorer-panel" isOpen={selectedRightPanel == "ce"} width={240} top={50}>
            
            
            </Panel>
            
            
            <ArtifactTitle style={{ position: "fixed", left: 0, top: 50, width: 240 }}  />


            <Toolbar key="ct" top={50} left={240} right={selectedRightPanel? 240: 0} thickness={50}>
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
                    <Section>
                        <Command name="delete" label="Delete" icon="trash" />
                    </Section>
                </div>
            </Toolbar>

            <Canvas key="canvas" 
                zoom={state.zoom}
                top={100} 
                left={showLeftPanel? 240: 0} 
                bottom={40} 
                right={selectedRightPanel? 240: 0} />

            <Footer key="cf" bottom={0} left={showLeftPanel? 240: 0} right={selectedRightPanel? 240: 0} thickness={40}>
                <ZoomControl value={state.zoom} onChange={handleZoomChange} style={{  }} />
            </Footer>
        </>
    );
}