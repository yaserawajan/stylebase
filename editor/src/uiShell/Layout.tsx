import "./layout.css";

import * as React from "react";

import { NavBar } from "./navbar/NavBar";
import { Toolbar } from "./toolbar/Toolbar";
import { Footer } from "./Footer"
import { Section } from "./controls/Section";
import { Command } from "./controls/Command";
import { TabSelector } from "./controls/TabSelector";
import { Tab } from "./controls/Tab";


const navBarCss:React.CSSProperties = {
    position: "fixed",
    top: 0,
    left:0,
    right:0
};


interface ViewLayerSpecs {
    top?: number
    right?: number
    bottom?: number
    left?: number
    width?: number
    height?: number
    zIndex: number
    position: "absolute" | "fixed" | "relative"
}

type PanelSpecs = {
    [panelName:string]: {
        icon: string,
        label: string
    }
}

interface Props {
    activeLeftPanel: string
    
    leftPanels: string[]
    activeRightPanel: string
    
    rightPanels: string[]
    panelSpecs: PanelSpecs
    documentTitle?: string

    renderLogo: () => React.ReactNode
    renderToolbarElements: () => React.ReactNode
    renderPanel: (panelName: string, rect: ViewLayerSpecs) => React.ReactNode
    renderView: (viewName: string, rect: ViewLayerSpecs) => React.ReactNode

    onLeftPanelSelection: (panelName:string) => void
    onRightPanelSelection: (panelName:string) => void
}

export const Layout:React.SFC<Props> = (props) => {
    
    return (
        <>
            <NavBar key="nb" style={navBarCss}>
                <Section>
                    <TabSelector value={props.activeLeftPanel} onChange={props.onLeftPanelSelection}>
                        {props.leftPanels.map(panelName => (
                            props.panelSpecs[panelName] && 
                                <Tab name={panelName} 
                                    label={props.panelSpecs[panelName].label}
                                    icon={props.panelSpecs[panelName].icon} />
                        ))}
                    </TabSelector>
                </Section>
                <Section>
                    {props.renderLogo()}
                </Section>
                <div className="stretch" />
                <Section />
                <Section>
                    <TabSelector value={props.activeRightPanel} onChange={props.onRightPanelSelection}>
                        {props.rightPanels.map(panelName => (
                            props.panelSpecs[panelName] && 
                                <Tab name={panelName} 
                                    label={props.panelSpecs[panelName].label}
                                    icon={props.panelSpecs[panelName].icon} />
                        ))}
                    </TabSelector>
                </Section>
                <Section>
                    <Command label="User" name="user" icon="user" />
                </Section>
            </NavBar>

            {props.activeLeftPanel && props.renderPanel(props.activeLeftPanel, {
                top: 50,
                bottom: 0,
                left: 0,
                width: 240,
                zIndex: 1000,
                position: "fixed" 
            })}

            {props.activeRightPanel && props.renderPanel(props.activeRightPanel, {
                top: 50,
                bottom: 0,
                right: 0,
                width: 240,
                zIndex: 1000,
                position: "fixed" 
            })}

            
            <Toolbar key="ct" top={50} 
                left={props.activeLeftPanel? 240: 0} 
                right={props.activeRightPanel? 240: 0} 
                thickness={50}>
                
                {props.renderToolbarElements()}
                
            </Toolbar>

            {props.renderView("default", {
                top: 100,
                left: props.activeLeftPanel? 240: 0, 
                bottom: 40,
                right: props.activeRightPanel? 240: 0,
                zIndex: 999,
                position: "fixed"
            })}
            
            <Footer key="cf" bottom={0} left={props.activeLeftPanel? 240: 0} right={props.activeRightPanel? 240: 0} thickness={40}>
                
            </Footer>
        </>
    );
}