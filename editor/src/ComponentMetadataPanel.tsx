import * as React from "react";
import { Panel } from "./uiShell/panel/Panel";
import { Title } from "./uiShell/controls/Title";
import { Menu } from "./uiShell/controls/Menu";

interface Props {
    style: React.CSSProperties
} 

export const ComponentMetadataPanel:React.SFC<Props> = (props) => {

    return (
        <Panel key="cmp" style={props.style}>
            <Title>Component Specs</Title>
            
            <Menu name="parameters" 
                title="Parameters" 
                isToggled={false} 
                onToggle={() => {}}>
                
            </Menu>
                
            <Menu name="states" 
                title="Visual States" 
                isToggled={false} 
                onToggle={() => {}}>

            </Menu>
        
            <Menu name="dataSample" 
                title="Data Sample" 
                isToggled={false} 
                onToggle={() => {}}>
                
            </Menu>
                
                
            <Menu name="componentLib"
                title="Component Library"
                isToggled={false}
                onToggle={()=>{}}>
                
            </Menu>


        </Panel>
    );
}