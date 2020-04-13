import * as React from "react";
import { ElementId, setElementId } from "./viewElementIdentification";

export type ViewElementContext = {
    ref: React.Ref<HTMLElement>,
    elementId: ElementId
}

interface Props {
    elementId: ElementId
    onHover?: (element: ElementId) => void
    onClick?: (element: ElementId) => void
    children: (c: ViewElementContext) => JSX.Element
}

export const ViewElement:React.FunctionComponent<Props> = ({ children, elementId, onHover, onClick }) => {
    const ref = React.useRef<HTMLElement>(null);

    const handleMouseOver = (id: ElementId) => 
        (e: MouseEvent) => {
            e.stopPropagation();
            if (onHover) onHover(id);
        }

    const handleMouseOut = (id: ElementId) => 
        (e: MouseEvent) => {
            e.stopPropagation();
            if (onHover) onHover({});
        }

    let lastMouseDown:Element = null;

    const handleMouseDown = (e: MouseEvent) => {
        e.stopPropagation();
        lastMouseDown = e.target as any;
    }

    const handleMouseUp = (id: ElementId) =>
        (e: MouseEvent) => {
            e.stopPropagation();
            if (lastMouseDown === e.target && onClick) {
                onClick(id);
            }
            lastMouseDown = null;
        }

    React.useEffect(() => {
        const dom = ref.current;
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
    }, [elementId]);

    return children({ ref, elementId });
}