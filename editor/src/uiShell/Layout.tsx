import "./stylesheets/style.less";

import * as React from "react";

import { NavBar } from "./controls/NavBar";
import { Toolbar } from "./controls/Toolbar";
import { NavBarItem } from "./controls/NavBarItem";
import { Divider, Stretcher } from "./controls";
 
const navBarCss:React.CSSProperties = {
    position: "fixed",
    top: 0,
    left:0,
    right:0
};


export interface ViewLayerSpecs {
    style: React.CSSProperties
    className?: string
    top?: number
    right?: number
    bottom?: number
    left?: number
    width?: number
    height?: number
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
            {props.renderView("default", {
                top: 102,
                left: props.activeLeftPanel? 270: 0, 
                bottom: 40,
                right: (props.activeRightPanel? 270: 0),
                style: {
                    top: 102,
                    left: props.activeLeftPanel? 270: 0, 
                    bottom: 40,
                    right: (props.activeRightPanel? 270: 0)
                }
            })}

            <NavBar key="nb" style={navBarCss} className="top-side">
                
                
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

                <Divider />
                
                {props.renderLogo()}
                
                <Stretcher />
                
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
                className: "left-side",
                top: 51,
                bottom: 0,
                left: 0,
                width: 270,
                style: {
                    top: 51,
                    bottom: 0,
                    left: 0,
                    width: 270,
                    height: `calc(100% - ${51}px)`
                }
            })}

            {props.activeRightPanel && props.renderPanel(props.activeRightPanel, {
                className: "right-side",
                top: 51,
                bottom: 0,
                right: 0,
                width: 270,
                style: {
                    top: 51,
                    bottom: 0,
                    right: 0,
                    width: 270,
                    height: `calc(100% - ${51}px)`
                }
            })}

            

            <Toolbar key="ttop" className="top-side" style={{
                position: "fixed",
                left: props.activeLeftPanel? 270: 0,
                top: 51,
                right: props.activeRightPanel? (270): 0,
                width: `calc(100% - ${(props.activeLeftPanel? 270: 0) + (props.activeRightPanel? 270: 0)}px)`
            }}> 
                
                {props.renderToolbarElements()}
                
            </Toolbar>
 
            
            
            <Toolbar key="tbottom" className="bottom-side" style={{
                height: 41,
                bottom: 0,
                left: props.activeLeftPanel? 270: 0,
                right: props.activeRightPanel? (270): 0,
                width: `calc(100% - ${(props.activeLeftPanel? 270: 0) + (props.activeRightPanel? 270: 0)}px)`
            }} />
        </>
    );
}