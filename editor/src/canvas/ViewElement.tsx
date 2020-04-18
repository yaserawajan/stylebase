import * as React from "react";
import { ElementId, setElementId } from "./viewElementIdentification";
import { XYCoord, useDrag } from "react-dnd";

export type ViewElementContext = {
    ref: React.Ref<HTMLElement>
    elementId: ElementId
}

interface Props {
    mute?: boolean
    elementId: ElementId
    children: (c: ViewElementContext) => JSX.Element

    onHover?: (elementId?: ElementId) => void
    onClick?: (elementId: ElementId) => void
}

export const ViewElement:React.FunctionComponent<Props> = ({ children, elementId, mute, onHover, onClick }) => {
    const ref = React.useRef<HTMLElement>(null);
    
    const handleMouseOver = (id: ElementId) => 
        (e: MouseEvent) => {
            if (e.target !== ref.current) return;
            if (onHover) onHover(id);
        }

    const handleMouseOut = (id: ElementId) => 
        (e: MouseEvent) => {
            if (e.target !== ref.current) return;
            if (onHover) onHover(undefined);
        }

    let lastMouseDown:Element = null;

    const handleMouseDown = (e: MouseEvent) => {
        //e.stopPropagation();
        if (e.target !== ref.current) return;
        lastMouseDown = e.target as any;
    }

    const handleMouseUp = (id: ElementId) =>
        (e: MouseEvent) => {
            //e.stopPropagation();
            if (e.target !== ref.current) return;
            if (lastMouseDown === e.target && onClick) {
                onClick(id);
            }
            lastMouseDown = null;
        }

    React.useEffect(() => {
        const dom = ref.current;

        if (mute) dom.style.pointerEvents = "none";

        setElementId(dom, elementId);

        const over = handleMouseOver(elementId);
        const out = handleMouseOut(elementId);
        const down = handleMouseDown;
        const up = handleMouseUp(elementId);

        dom.addEventListener("mouseover", over);
        dom.addEventListener("mouseout", out);
        dom.addEventListener("mousedown", down);
        dom.addEventListener("mouseup", up);

        return () => {
            dom.removeEventListener("mouseover", over);
            dom.removeEventListener("mouseout", out);
            dom.removeEventListener("mousedown", down);
            dom.removeEventListener("mouseup", up);
        }
    }, [elementId, mute]);

    return children({ ref, elementId });
}