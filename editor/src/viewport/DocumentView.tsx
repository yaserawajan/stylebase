import * as React from "react";
import { ElementRect } from "./types";
import { DocumentMargin } from "./DocumentMargin";
import { elementIdFromDom } from "./viewElementIdentification";

interface Props {
    marginId: string
    contentId: string
    rerenderSequence: number
    margins: number
    style: React.CSSProperties
    zoom: number
    onRectChange?: (rects: ElementRect[]) => void
}
 
type PartialMutationRecord = {
    target: Node
}

type Entry =  {
    m: PartialMutationRecord
    elementId: string
}

const createEntryMapper = (marginRect:DOMRect, borderRect: DOMRect, zoom: number) => 
    (pair:Entry):ElementRect => {
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
                width: r.width / zoom, 
                height: r.height / zoom,
                top: (r.top - borderRect.top) / zoom,
                left: (r.left - borderRect.left) / zoom,
                bottom: r.bottom / zoom,
                right: r.right / zoom
            },
            
            info: pair.elementId
        }

    }

const createRectReader = (marginRef: HTMLDivElement, borderRef: HTMLDivElement, zoom: number) =>
    () => {
        const marginRect = marginRef.getBoundingClientRect();
        const borderRect = borderRef.getBoundingClientRect();
        let all:PartialMutationRecord[] = [];
        marginRef.querySelectorAll("*").forEach(n => all.push({ target: n }));
        return all
            .map(m => ({
                m,
                elementId: ("getAttribute" in m.target)
                    ? elementIdFromDom(m.target)
                    : undefined
            }))
            .filter(pair => !!pair.elementId)
            .map<ElementRect>(createEntryMapper(marginRect, borderRect, zoom));
    }

export const DocumentView:React.SFC<Props> = (props) => {

    const marginRef = React.useRef<HTMLDivElement>();
    const boxRef = React.useRef<HTMLDivElement>();
    
    const emitRectData = () => {
        const rects = createRectReader(marginRef.current, boxRef.current, props.zoom)();
        if (props.onRectChange) props.onRectChange(rects);
    }

    // refresh rectangles on mount and zoom changes
    React.useEffect(() => {
        emitRectData();
    }, [props.zoom, props.rerenderSequence]);

    React.useEffect(() => {
        let mo = new MutationObserver(() => setTimeout(emitRectData, 0));
        mo.observe(marginRef.current, { childList: true, subtree: true, characterData: true, attributes: true });
        return () => mo.disconnect();
    }, [props.zoom]);

    return (
        <div 
            ref={marginRef}
            data-editor-id={props.marginId}
            style={{ 
                ...props.style,
                display: "block", 
                transformOrigin: "0 0", 
                transform: `scale(${props.zoom})`, 
                position: "relative", 
                top: 0, 
                left: 0
            }}>
            
            <DocumentMargin margin={props.margins}>
                <div ref={boxRef} data-editor-id={props.contentId}>

                    {props.children}
                    
                </div>
            </DocumentMargin>
            
        </div>
    );
}