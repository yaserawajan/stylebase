import * as React from "react";

import { NavBar } from "./NavBar";
import { Canvas } from "./Canvas";
import { SidePanel } from "./SidePanel";
import { SidePanelHandle } from "./SidePanelHandle";
import { IconLA } from "./IconLA";
import { SidePanelSection } from "./SidePanelSection";
import { ArtifactTitle } from "./ArtifactTitle";
import { Toolbar } from "./Toolbar";
import { CanvasFooter } from "./CanvasFooter"
import { ZoomControl } from "./ZoomControl";
import { SectionLine } from "./SectionLine";
import { SectionLineGroup } from "./SectionLineGroup";
import { SectionTree } from "./SectionTree";
import { DropDownList } from "./DropDownList";
import { Section } from "./Section";
import { Command } from "./Command";

const navBarCss:React.CSSProperties = {
    position: "fixed",
    top: 0,
    left:50,
    right:50
};

type ToggleMap = {
    [k:string]: boolean
} 

type State = {
    leftToggled: boolean,
    rightToggled: boolean,
    panelSections: ToggleMap,
    zoom: number
}

export const IdeApp:React.SFC<{}> = ({}) => {
    
    const [state, setState] = React.useState<State>({
        leftToggled: true,
        rightToggled: false,
        zoom: 1,
        panelSections: {}
    });

    const handleLeftClick = () => {
        setState({ ...state, leftToggled: !state.leftToggled });
    }

    const handleRightClick = () => {
        setState({ ...state, rightToggled: !state.rightToggled });
    }

    const handleSectionToggle = (name: string) => {
        setState({ ...state, panelSections: { ...state.panelSections, [name]: !state.panelSections[name] }})
    }

    const handleZoomChange = (newValue: number) => {
        setState({ ...state, zoom: newValue });
    }

    return (
        <>
            <SidePanel appearFrom="left" key="lsp" isOpen={state.leftToggled} closedWidth={0} openWidth={240} top={100}>
                
                <SidePanelSection name="parameters" title="Parameters" isToggled={state.panelSections["parameters"]} onToggle={handleSectionToggle}>
                    <SectionTree>
                        <SectionLine>style</SectionLine>
                        <SectionLine>className</SectionLine>
                    </SectionTree>
                </SidePanelSection>

                <SidePanelSection 
                    name="states" 
                    title="Visual States" 
                    isToggled={state.panelSections["states"]} 
                    onToggle={handleSectionToggle}>
                    
                </SidePanelSection>

                <SidePanelSection name="children" title="Children" isToggled={state.panelSections["children"]} onToggle={handleSectionToggle}>
                    
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

                </SidePanelSection>
            </SidePanel>

            <SidePanel appearFrom="right" key="rsp" isOpen={state.rightToggled} closedWidth={0} openWidth={240} top={50} />
            
            <ArtifactTitle style={{ position: "fixed", left: 0, top: 50, width: 240 }}  />


            <SidePanelHandle key="lh" 
                style={{ top: 0, left: 0 }}
                isToggled={state.leftToggled}
                onToggle={handleLeftClick}>
                <IconLA icon="bars" />
            </SidePanelHandle>

            <SidePanelHandle key="rh" 
                style={{ top: 0, right: 0 }}
                isToggled={state.rightToggled}
                onToggle={handleRightClick}>
                <IconLA icon="sliders-h" />
            </SidePanelHandle>

            <NavBar key="nb" style={navBarCss} />

            <Toolbar key="ct" top={50} left={240} right={state.rightToggled? 240: 0} thickness={50}>
                
                    <DropDownList
                        style={{ minWidth: 120, maxWidth: 200 }} 
                        isToggled={false} 
                        label="Ineractive State" value="toggled" />
                
                <Section>
                    <Command label="pointer" icon="mouse-pointer" />
                    <Command label="Components" icon="shapes" />
                </Section>
                <Section>
                    <Command label="Undo" icon="undo" />
                    <Command label="Redo" icon="redo" />
                    <Command label="Cut" icon="cut" />
                    <Command label="Copy" icon="copy" />
                    <Command label="Paste" icon="paste" />
                </Section>
            </Toolbar>

            <Canvas key="canvas" 
                zoom={state.zoom}
                top={100} 
                left={state.leftToggled? 240: 0} 
                bottom={40} 
                right={state.rightToggled? 240: 0} />

            <CanvasFooter key="cf" bottom={0} left={state.leftToggled? 240: 0} right={state.rightToggled? 240: 0} thickness={40}>
                <ZoomControl value={state.zoom} onChange={handleZoomChange} style={{  }} />
            </CanvasFooter>
        </>
    );
}