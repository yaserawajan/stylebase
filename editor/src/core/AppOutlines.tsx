import * as React from "react";

import { OutLine } from "../viewport/OutLine";
import { OverlayHover } from "./overlays/OverlayHover";
import { OverlaySelection } from "./overlays/OverlaySelection";
import { OverlayDragHover } from "./overlays/OverlayDragHover";
import { Draggable } from "./draggables";


interface Props {
    rootElement: string
    hoveredElement: string
    component: string
    selectedElements: string[]
    dragItem: Draggable
    dropLocation: { component: string, elementId: string, actionType: string }
}

export const AppOutlines:React.SFC<Props> = ({ hoveredElement, selectedElements, dropLocation }) => {

    return (
        <>
            {dropLocation && dropLocation.actionType &&
                <OutLine key="drag-hover" element={dropLocation.elementId}>
                {({ elementId, actual, display }) => 
                    <OverlayDragHover 
                        element={elementId} 
                        actualRect={actual} 
                        displayRect={display}
                        actionType={dropLocation.actionType} />
                }
                </OutLine>}

            {hoveredElement && (selectedElements.indexOf(hoveredElement) == -1) && 
                <OutLine key="hover" element={hoveredElement}>
                {({ elementId, actual, display }) => 
                    <OverlayHover 
                        element={elementId} 
                        actualRect={actual} 
                        displayRect={display} />
                }
                </OutLine>
            }

            {selectedElements.length > 0
                ? selectedElements.map(e => (
                    <OutLine key={`sel-${e}`} element={e}>
                    {({ elementId, actual, display }) => 
                        <OverlaySelection 
                            element={elementId} 
                            actualRect={actual} 
                            displayRect={display} />
                    }
                    </OutLine>
                )) 
                : null
            }
        </>
    );
}