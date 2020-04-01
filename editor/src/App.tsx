import * as React from "react";
import { Layout } from "./uiShell/Layout";
import { DropDownList } from "./uiShell/controls/DropDownList";
import { Section } from "./uiShell/controls/Section";
import { Command } from "./uiShell/controls/Command";
import { OutLine } from "./canvas/OutLine";
import { Canvas } from "./canvas/Canvas";
import { ComponentMetadataPanel } from "./ComponentMetadataPanel";
import { ComponentViewEditorPanel } from "./ComponentViewEditorPanel";
import { useActivePanelState, useZoomState, useHoverState } from "./uiState/ideState";
import { OverlayHover } from "./overlays/OverlayHover";
import { useDocSelectionState, selectionChanged } from "./core/docEditorState";
import { DocSelection } from "./core/docState";
import { useDispatch } from "react-redux";
import { OverlaySelection } from "./overlays/OverlaySelection";
 
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


interface Props {

} 

export const App:React.SFC<Props> = (props) => {

    const [leftPanel, setLeftPanel] = useActivePanelState("left");
    const [rightPanel, setRightPanel] = useActivePanelState("right");
    const [zoom, setZoom] = useZoomState();
    const [hoveredElement, setHoveredElement] = useHoverState();
    
    const selection = useDocSelectionState<DocSelection>();
    const dispatch = useDispatch();

    const handleElementClick = (element:string) => {
        dispatch(selectionChanged({ elements: [ element ]}));
    }

    return (
        <Layout 
            activeLeftPanel={leftPanel}
            activeRightPanel={rightPanel}
            leftPanels={[ "docNavigator"]}
            rightPanels={[ "componentMetadata", "componentViewEditor"  ]}
            panelSpecs={{
                "docNavigator": {
                    icon: "bars",
                    label: "Document Navigator"
                },
                "componentMetadata": {
                    icon: "microchip",
                    label: "Component Metadata"
                },
                "componentViewEditor": {
                    icon: "shapes",
                    label: "Component View Editor"
                }
            }}
            renderPanel={(panelName, rect) => {
                switch (panelName) {
                    case "docNavigator": return <div style={rect} />;
                    case "componentMetadata": return <ComponentMetadataPanel style={rect} />;
                    case "componentViewEditor": return <ComponentViewEditorPanel style={rect} />;
                    default: return <div style={rect} />;
                }
            }}
            renderLogo={() => <span style={{ marginLeft: 10 }}>S T Y L E B A S E</span>}
            renderToolbarElements={
                () => (
                    <>
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
                    </>
                )}
            renderView={(_, rect) => (
                <Canvas key="canvas" 
                    documentMargins={50}
                    contents={sampleDoc}
                    zoom={zoom}
                    top={rect.top} 
                    left={rect.left} 
                    bottom={rect.bottom} 
                    right={rect.right}
                    onZoomChange={setZoom}
                    onHover={setHoveredElement}
                    onClick={handleElementClick}>
                
                    {hoveredElement && (selection.elements.indexOf(hoveredElement) == -1) && 
                        <OutLine key="hover" element={hoveredElement}>
                            {({ element, actual, display }) => (
                                <OverlayHover element={element} actualRect={actual} displayRect={display} />
                            )}
                        </OutLine>
                    }
                    {selection.elements.length > 0
                        ? selection.elements.map(e => (
                            <OutLine key={`sel-${e}`} element={e}>
                            {
                                ({ element, actual, display }) => 
                                    <OverlaySelection element={element} actualRect={actual} displayRect={display} />
                            }
                            </OutLine>
                        )) 
                        : null}

                </Canvas> 

            )}
            onLeftPanelSelection={setLeftPanel}
            onRightPanelSelection={setRightPanel} />

    );
}