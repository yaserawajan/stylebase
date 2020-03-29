import * as React from "react";
import { ElementRectMap } from "./types";
import "./document_view.css";
import { DocumentMargin } from "./DocumentMargin";

const NAME_ATTRIBUTE = "data-doc-element";

interface Props {
    contents: JSX.Element
    margins: number
    style: React.CSSProperties
    zoom: number
    onRectChange?: (rects: ElementRectMap) => void
    onHover?: (elementName?: string, x?: number, y?: number) => void
    onClick?: (elementName?: string, x?: number, y?: number) => void
}
 
type PartialMutationRecord = {
    target: Node
}

const getNamedElement = (root: HTMLElement, targetDom: HTMLElement, rootName: string): string | undefined => {
    if (root === targetDom) return rootName;
    const elementName = targetDom.getAttribute(NAME_ATTRIBUTE);
    return elementName || getNamedElement(root, targetDom.parentElement, rootName);
}

export const DocumentView:React.SFC<Props> = (props) => {

    const ref = React.useRef<HTMLDivElement>();
    const boxRef = React.useRef<HTMLDivElement>();

    const rootName = props.contents? props.contents.props[NAME_ATTRIBUTE] : "";

    const handleMouseOver = (e: React.MouseEvent) => {
        const elementName = getNamedElement(ref.current, e.target as HTMLElement, rootName);
        if (props.onHover) props.onHover(elementName);
    }

    const handleMouseOut = (e: React.MouseEvent) => {
        //const elementName = getNamedElement(ref.current, e.target as HTMLElement, rootName);
        if (props.onHover) props.onHover(undefined);
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        const elementName = getNamedElement(ref.current, e.target as HTMLElement, rootName);
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        const elementName = getNamedElement(ref.current, e.target as HTMLElement, rootName);
    }

    const handleMutations = (mutations:PartialMutationRecord[]) => {
        const marginRect = ref.current.getBoundingClientRect();
        const borderRect = boxRef.current.getBoundingClientRect();
        const rects = mutations
            .filter(m => 
                ("getAttribute" in m.target) && 
                !!(m.target as Element).getAttribute(NAME_ATTRIBUTE))
            .map(m => { 
                const r = (m.target as Element).getBoundingClientRect();
                return {
                    value: {
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
                        }
                    }, 
                    key: (m.target as Element).getAttribute(NAME_ATTRIBUTE)
                }
            });

        let rectMap:ElementRectMap = { };
        rects.forEach(pair => { 
            rectMap[pair.key] = pair.value;
        }); 

        if (props.onRectChange) props.onRectChange(rectMap);
    }


    React.useEffect(() => {
        let all:PartialMutationRecord[] = [];
        ref.current.querySelectorAll("[data-doc-element]").forEach(n => all.push({ target: n }));
        handleMutations(all);
    }, [props.zoom]);

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
                    {props.contents}
                </div>
            </DocumentMargin>
        </div>
    );
}