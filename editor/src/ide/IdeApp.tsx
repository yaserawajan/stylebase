import "./ide_app.css";

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavBar } from "./navbar/NavBar";
import { Canvas } from "./canvas/Canvas";
import { Panel } from "./panel/Panel";
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
import { IdeState, getZoom, zoomChanged, hoverChanged } from "./state/ideState";
import { Toggler } from "./state/toggle/Toggler";
import { OutLine } from "./canvas/OutLine";


const navBarCss:React.CSSProperties = {
    position: "fixed",
    top: 0,
    left:0,
    right:0
};

export const IdeApp:React.SFC<{}> = ({}) => {
    
    const hoveredElement = useSelector<IdeState,string | undefined>(s => s.hoveredElement);
    const zoom = useSelector<IdeState,number>(getZoom);
    const showLeftPanel = useSelector<IdeState,boolean>(s => s.toggles["leftSidePanel"])
    const selectedRightPanel = useSelector<IdeState,string>(s => s.options["rightSidePanel"]);
    const dispatch = useDispatch();

    const handleHoverChange = (element?: string) => dispatch(hoverChanged(element));

    const handleZoomChange = (value: number) => dispatch(zoomChanged(value));
    
    const sampleDoc = (
        <div data-doc-element="root">
            <div data-doc-element="e1" style={{ padding: 30 }}>This is a test box</div>
            <div data-doc-element="e2" style={{ padding: 30 }}>This is a test box</div>
            <div data-doc-element="e3" style={{ padding: 30 }}>This is a test box</div>
            <div data-doc-element="e4" style={{ padding: 30 }}>
                <span>This is a test box where text is in an unnamed span</span>
                <div data-doc-element="e4-1" style={{ padding: 30 }}>This is a test box inside a parent</div>
            </div>
        </div>
    );

    return (
        <>
            <NavBar key="nb" style={navBarCss}>
                
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
                            
                    <div className="stretch" />

                    <Section />
                    <Section>
                        <OptionSelector subject="rightSidePanel" allowNone>
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
                
            </NavBar>


            <Panel appearFrom="left" key="lsp" isOpen={showLeftPanel} width={240} top={50}>

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
                    
                    <div className="row pt2 ph2">
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
                </Header>
                <Header>
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
            
            

            <Toolbar key="ct" top={50} left={showLeftPanel? 240: 0} right={selectedRightPanel? 240: 0} thickness={50}>
                
                    <DropDownList
                        style={{ minWidth: 120, maxWidth: 200 }} 
                        isToggled={false} 
                        label="State Tags" value="toggled" />

                    <div className="stretch" />
                
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
                
            </Toolbar>

            <Canvas key="canvas" 
                documentMargins={50}
                contents={sampleDoc}
                zoom={zoom}
                top={100} 
                left={showLeftPanel? 240: 0} 
                bottom={40} 
                right={selectedRightPanel? 240: 0}
                onHover={handleHoverChange}>
                
                {hoveredElement && 
                    <OutLine key="hover" element={hoveredElement}>
                        {({ element, actual, display }) => (
                            <div className="overlay-hover" style={{ top: display.top, left: display.left, height: display.height, width: display.width }}>
                                <span key="title" className="title">{element}</span>
                                <span key="dimensions" className="dimensions">{actual.width} x {actual.height}</span>
                            </div>
                        )}
                    </OutLine>
                }

            </Canvas>

            <Footer key="cf" bottom={0} left={showLeftPanel? 240: 0} right={selectedRightPanel? 240: 0} thickness={40}>
                <ZoomControl value={zoom} onChange={handleZoomChange} />
            </Footer>
        </>
    );
}