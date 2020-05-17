import * as React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { ViewLayerSpecs } from "../uiShell/Layout";
import { Viewport } from "../viewport/Viewport";
import { ElementId } from "../viewport/viewElementIdentification";
import { selectionChanged, DocEditorState } from "../patterns/docEditor/docEditorState";
import { useZoomState, useHoverState, selectIde } from "./uiState/ideState";
import { useDocSelectionState, useDocEditorState } from "../patterns/docEditor/docEditorHooks";
import { DocSelection, DocState } from "./doc/docModels";
import { AppElement } from "./AppElement";
import { useComponentFactory } from "./doc/docLibHooks";
import { AppOutlines } from "./AppOutlines";


interface Props extends DocSelection {
    rect: ViewLayerSpecs
}
 
export const ComponentView:React.SFC<Props> = ({ rect, component, elements }) => {

    const { dragItem, dropLocation } = useSelector((s:any) => ({ 
        dropLocation: selectIde(s).dropLocation,
        dragItem: selectIde(s).draggedItem
    }), shallowEqual);

    const [zoom, setZoom] = useZoomState();
    const [hoveredElement, setHoveredElement] = useHoverState();
    const rootElement = useDocEditorState((editor: DocEditorState<DocState,DocSelection>) => {
        const compName = editor.present.selection.component;
        if (!compName) return undefined;
        return editor.preview.components.byName[compName].rootElement;
    });
    const componentFactory = useComponentFactory();
    const dispatch = useDispatch();

    const handleElementClick = (element:ElementId) => {
        dispatch(selectionChanged({ elements: [ element ]}));
    }

    return (
        <Viewport 
            key="canvas" 
            documentMargins={50}
            zoom={zoom}
            top={rect.top} 
            left={rect.left} 
            bottom={rect.bottom} 
            right={rect.right}
            renderOutlines={() => (
                <AppOutlines 
                    hoveredElement={hoveredElement}
                    dragItem={dragItem}
                    dropLocation={dropLocation}
                    rootElement={rootElement}
                    selectedElements={elements} 
                    component={component} />
            )}
            onZoomChange={setZoom}>

            {rootElement

                ? <AppElement 
                    component={component}
                    elementId={rootElement} 
                    componentFactory={componentFactory}
                    onHover={setHoveredElement}
                    onClick={handleElementClick} />

                : <div>Nothing to display. You can select a component to view from the left pane</div>
            }
            
        </Viewport>
    )

}