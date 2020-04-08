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


export interface ViewLayerSpecs {
    top?: number
    right?: number
    bottom?: number
    left?: number
    width?: number
    height?: number
    zIndex: number
    position: "absolute" | "fixed" | "relative"
}

export type PanelSpecs = {
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
                
                <TabSelector key="left" value={props.activeLeftPanel} onChange={props.onLeftPanelSelection}>
                    {props.leftPanels.map(panelName => (
                        props.panelSpecs[panelName] && 
                        <Tab key={panelName} name={panelName}>
                            <Command name={panelName} 
                                icon={props.panelSpecs[panelName].icon}
                                label={props.panelSpecs[panelName].label} />
                        </Tab> 
                    ))}
                </TabSelector>

                <div key="div1" className="divider" />
                <div key="logo">
                    {props.renderLogo()}
                </div>
                <div key="stretch" className="stretch" />
                <div key="div2" className="divider" />
                
                <TabSelector key="right" value={props.activeRightPanel} onChange={props.onRightPanelSelection}>
                    {props.rightPanels.map(panelName => (
                        props.panelSpecs[panelName] && 
                            <Tab key={panelName} name={panelName}>
                                <Command name={panelName} 
                                    icon={props.panelSpecs[panelName].icon}
                                    label={props.panelSpecs[panelName].label} />
                            </Tab> 
                    ))}
                </TabSelector>
                
                
                
            </NavBar>

            {props.activeLeftPanel && props.renderPanel(props.activeLeftPanel, {
                top: 50,
                bottom: 0,
                left: 0,
                width: 270,
                zIndex: 1000,
                position: "fixed" 
            })}

            {props.activeRightPanel && props.renderPanel(props.activeRightPanel, {
                top: 50,
                bottom: 0,
                right: 0,
                width: 270,
                zIndex: 1000,
                position: "fixed" 
            })}

            
            <Toolbar key="ct" top={50} 
                left={props.activeLeftPanel? 270: 0} 
                right={props.activeRightPanel? 270: 0} 
                thickness={50}>
                
                {props.renderToolbarElements()}
                
            </Toolbar>

            {props.renderView("default", {
                top: 100,
                left: props.activeLeftPanel? 270: 0, 
                bottom: 40,
                right: props.activeRightPanel? 270: 0,
                zIndex: 999,
                position: "fixed"
            })}
            
            <Footer key="cf" bottom={0} left={props.activeLeftPanel? 270: 0} right={props.activeRightPanel? 270: 0} thickness={40}>
                
            </Footer>
        </>
    );
}