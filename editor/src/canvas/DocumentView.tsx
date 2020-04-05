import * as React from "react";
import { ElementRect } from "./types";
import "./document_view.css";
import { DocumentMargin } from "./DocumentMargin";
import { DocumentViewElement } from "./DocumentViewElement";
import { ElementId, elementIdFromJsx, elementIdFromDom, isElementIdEmpty } from "./viewElementIdentification";

interface Props {
    rerenderSequence: number
    contents: JSX.Element
    idProps: string[]
    margins: number
    style: React.CSSProperties
    zoom: number
    onRectChange?: (rects: ElementRect[]) => void
    onHover?: (elementName?: ElementId, x?: number, y?: number) => void
    onClick?: (elementName?: ElementId, x?: number, y?: number) => void
}
 
type PartialMutationRecord = {
    target: Node
}

const resolveElementId = (root: HTMLElement, 
    targetDom: HTMLElement, 
    rootName: ElementId, 
    idProps: string[]): { [k:string]:any } => {

    if (root === targetDom) return rootName;
    const elementId = elementIdFromDom(targetDom, idProps);
    return isElementIdEmpty(elementId)
        ? resolveElementId(root, targetDom.parentElement, rootName, idProps)
        : elementId;
}

export const DocumentView:React.SFC<Props> = (props) => {

    const ref = React.useRef<HTMLDivElement>();
    const boxRef = React.useRef<HTMLDivElement>();

    const rootName:ElementId = props.contents? elementIdFromJsx(props.contents, props.idProps): { };

    const handleMouseOver = (e: React.MouseEvent) => {
        const elementName = resolveElementId(ref.current, e.target as HTMLElement, rootName, props.idProps);
        
        if (props.onHover) props.onHover(elementName);
    }

    const handleMouseOut = (e: React.MouseEvent) => {
        //const elementName = getNamedElement(ref.current, e.target as HTMLElement, rootName);
        if (props.onHover) props.onHover({});
    }

    let lastMouseDown:Element = null;

    const handleMouseDown = (e: React.MouseEvent) => {
        const elementName = resolveElementId(ref.current, e.target as HTMLElement, rootName, props.idProps);
        lastMouseDown = e.target as any;
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        const elementName = resolveElementId(ref.current, e.target as HTMLElement, rootName, props.idProps);
        if (lastMouseDown === e.target && props.onClick) {
            props.onClick(elementName);
        }
        lastMouseDown = null;
    }

    const handleMutations = (mutations:PartialMutationRecord[]) => {
        const marginRect = ref.current.getBoundingClientRect();
        const borderRect = boxRef.current.getBoundingClientRect();
        const rects = mutations
            .map(m => ({
                m,
                elementId: ("getAttribute" in m.target)? elementIdFromDom(m.target, props.idProps): {}
            }))
            .filter(pair => !isElementIdEmpty(pair.elementId))
            .map<ElementRect>(pair => { 
                const r = (pair.m.target as Element).getBoundingClientRect();
                return {
                    
                    display: {
                        ...r,
                        width: r.width, 
                        height: r.height,
                        top: r.top - marginRect.top,
                        left: r.left - marginRect.left
                    },

                    actual: {
                        ...r,
                        width: r.width / props.zoom, 
                        height: r.height / props.zoom,
                        top: (r.top - borderRect.top) / props.zoom,
                        left: (r.left - borderRect.left) / props.zoom,
                        bottom: r.bottom / props.zoom,
                        right: r.right / props.zoom
                    },
                    
                    info: pair.elementId
                }
            });

        
        if (props.onRectChange) props.onRectChange(rects);
    }

    // refresh rectangles on mount and zoom changes
    React.useEffect(() => {
        let all:PartialMutationRecord[] = [];
        ref.current.querySelectorAll("*").forEach(n => all.push({ target: n }));
        handleMutations(all);
    }, [props.zoom, props.rerenderSequence]);

    React.useEffect(() => {
        let mo = new MutationObserver(handleMutations);
        mo.observe(ref.current, { childList: true, subtree: true });
        return () => mo.disconnect();
    }, []);

    if (!rootName) return <div>Document contents must start with a named element</div>;

    return (
        <div 
            ref={ref}
            style={{ 
                ...props.style,
                display: "block", 
                transformOrigin: "0 0", 
                transform: `scale(${props.zoom})`, 
                position: "relative", 
                top: 0, 
                left: 0
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}>
            <DocumentMargin margin={props.margins}>
                <div className="document-view" ref={boxRef}>
                    <DocumentViewElement contents={props.contents} idProps={props.idProps} /> 
                </div>
            </DocumentMargin>
        </div>
    );
}