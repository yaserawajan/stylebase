import * as React from "react";
import { useDispatch } from "react-redux";
import { XYCoord } from "react-dnd";

import { ViewLayerSpecs } from "./uiShell/Layout";
import { Canvas } from "./canvas/Canvas";
import { ElementId } from "./canvas/viewElementIdentification";
import { OutLine } from "./canvas/OutLine";
import { OverlaySelection } from "./overlays/OverlaySelection";
import { OverlayHover } from "./overlays/OverlayHover";
import { selectionChanged } from "./docEditor/docEditorState";
import { useZoomState, useHoverState } from "./uiState/ideState";
import { useDocSelectionState } from "./docEditor/docEditorSelectors";
import { DocSelection } from "./doc/docState";
import { useDocJsxCompiler } from "./doc/docRenderUtils";
import { DocLibCollection } from "./doc/docLibModels";


const EDITOR_ID = "editorId";
const infoProps = [EDITOR_ID];
const idFromElementInfo = (info: ElementId) => info[EDITOR_ID];

interface Props {
    rect: ViewLayerSpecs
    libCollection: DocLibCollection
}

export const AppDocumentView:React.SFC<Props> = ({ rect, libCollection }) => {

    const jsx = useDocJsxCompiler(libCollection);
    const [zoom, setZoom] = useZoomState();
    const [hoveredElement, setHoveredElement] = useHoverState();
    const selection = useDocSelectionState<DocSelection>();
    const dispatch = useDispatch();

    const handleElementClick = (element:ElementId) => {
        dispatch(selectionChanged({ elements: [ idFromElementInfo(element) ]}));
    }

    const handleElementHover = (element:ElementId) => {
        setHoveredElement(idFromElementInfo(element));
    }

    const handleDragHover = (elementId: ElementId, item: any, offset: XYCoord) => {
        console.log(elementId);
    }

    const handleDragDrop = (elementId: ElementId, item: any, offset: XYCoord) => {

    }

    return (
        <Canvas 
            key="canvas" 
            documentMargins={50}
            contents={jsx}
            idProps={infoProps}
            idAsString={idFromElementInfo}
            zoom={zoom}
            top={rect.top} 
            left={rect.left} 
            bottom={rect.bottom} 
            right={rect.right}
            onZoomChange={setZoom}
            onHover={handleElementHover}
            onClick={handleElementClick}
            onDragHover={handleDragHover}
            onDragDrop={handleDragDrop}>
        
            {hoveredElement && (selection.elements.indexOf(hoveredElement) == -1) && 
                <OutLine key="hover" element={hoveredElement}>
                {({ elementId, actual, display }) => 
                    <OverlayHover element={elementId} actualRect={actual} displayRect={display} />
                }
                </OutLine>
            }

            {selection.elements.length > 0
                ? selection.elements.map(e => (
                    <OutLine key={`sel-${e}`} element={e}>
                    {({ elementId, actual, display }) => 
                        <OverlaySelection 
                            element={elementId} 
                            actualRect={actual} 
                            displayRect={display} />
                    }
                    </OutLine>
                )) 
                : null}

        </Canvas>
    )

}