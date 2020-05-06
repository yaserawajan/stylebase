import "./stylesheets/style.less";

import * as React from "react";

import { NavBar } from "./navbar/NavBar";
import { Toolbar } from "./toolbar/Toolbar";
import { Footer } from "./Footer";
import { NavBarItem } from "./controls/NavBarItem";
 

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
    
    
    floatingPanels: string[]
    
    leftPanels: string[]
    rightPanels: string[]
    activeLeftPanel: string

    activeRightPanel: string
    
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
    
    

    const leftChangeHandler = (value: string) =>
        () => {
            props.onLeftPanelSelection(value);
        }

    const rightChangeHandler = (value: string) =>
        () => {
            props.onRightPanelSelection(value);
        } 
 
    return (
        <>
            <NavBar key="nb" style={navBarCss}>
                
                
                {props.leftPanels.map(panelName => (
                    props.panelSpecs[panelName] && 
                    
                        <NavBarItem 
                            selected={props.activeLeftPanel == panelName}
                            onClick={leftChangeHandler(panelName)}
                            key={panelName}
                            name={panelName} 
                            icon={props.panelSpecs[panelName].icon}
                            label={props.panelSpecs[panelName].label} />
                    
                ))}

                
                <div key="logo">
                    {props.renderLogo()}
                </div>

                <div key="stretch" className="stretch" />
                
                {props.rightPanels.map(panelName => (
                    props.panelSpecs[panelName] && 
                        
                        <NavBarItem 
                            selected={props.activeRightPanel == panelName}
                            onClick={rightChangeHandler(panelName)}
                            key={panelName}
                            name={panelName} 
                            icon={props.panelSpecs[panelName].icon}
                            label={props.panelSpecs[panelName].label} />
                        
                ))}
                
            </NavBar>

            {props.activeLeftPanel && props.renderPanel(props.activeLeftPanel, {
                top: 51,
                bottom: 0,
                left: 0,
                width: 270,
                zIndex: 1000,
                position: "fixed" 
            })}

            {props.activeRightPanel && props.renderPanel(props.activeRightPanel, {
                top: 51,
                bottom: 0,
                right: 0,
                width: 270,
                zIndex: 1000,
                position: "fixed" 
            })}

            <div className="palette-4 dark" style={{ 
                position: "fixed",
                zIndex: 5,
                top: 51,
                bottom: 0,
                left: props.activeLeftPanel? 270: 0,
                width: `calc(100% - ${(props.activeLeftPanel? 270: 0) + (props.activeRightPanel? 270: 0)}px)` 
            }} />

            <Toolbar key="ct" style={{
                position: "fixed",
                left: props.activeLeftPanel? 270: 0,
                top: 51,
                right: props.activeRightPanel? (270 + 1): 0,
                height: 50,
                width: `calc(100% - ${(props.activeLeftPanel? 270: 0) + (props.activeRightPanel? 270: 0) + 1}px)`
            }}> 
                
                {props.renderToolbarElements()}
                
            </Toolbar>
 
            {props.renderView("default", {
                top: 102,
                left: props.activeLeftPanel? 270: 0, 
                bottom: 40,
                right: (props.activeRightPanel? 270: 0) + 1,
                zIndex: 999,
                position: "fixed"
            })}
            
            <Footer key="cf" bottom={0} left={props.activeLeftPanel? 270: 0} right={props.activeRightPanel? 270: 0} thickness={40}>
                
            </Footer>
        </>
    );
}