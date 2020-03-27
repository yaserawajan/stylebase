import * as React from "react";
import { ElementRectMap } from "./types";


const NAME_ATTRIBUTE = "data-doc-element";

interface Props {
    style: React.CSSProperties
    zoom: number
    onRectChange?: (rects: ElementRectMap) => void
    onHover?: (elementName?: string) => void
    onClick?: (elementName?: string) => void
}

type PartialMutationRecord = {
    target: Node
}

const getNamedElement = (root: HTMLElement, targetDom: HTMLElement): string | undefined => {

    if (root === targetDom) return undefined;
    
    const elementName = targetDom.getAttribute(NAME_ATTRIBUTE);

    return elementName || getNamedElement(root, targetDom.parentElement);
}



export const DocumentView:React.SFC<Props> = (props) => {

    const ref = React.useRef<HTMLDivElement>();

    

    const handleMouseOver = (e: React.MouseEvent) => {
        const elementName = getNamedElement(ref.current, e.target as HTMLElement);
        if (props.onHover) props.onHover(elementName);
    }

    const handleMouseOut = (e: React.MouseEvent) => {
        const elementName = getNamedElement(ref.current, e.target as HTMLElement);
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        const elementName = getNamedElement(ref.current, e.target as HTMLElement);
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        const elementName = getNamedElement(ref.current, e.target as HTMLElement);
    }

    const handleMutations = (mutations:PartialMutationRecord[]) => {
        const docRect = ref.current.getBoundingClientRect();
        //const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        //const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const rects = mutations
            .filter(m => 
                ("getAttribute" in m.target) && 
                !!(m.target as Element).getAttribute(NAME_ATTRIBUTE))
            .map(m => { 
                const r = (m.target as Element).getBoundingClientRect();
                return {
                    value: {
                        width: r.width, 
                        height: r.height,
                        top: r.top - docRect.top,
                        left: r.left - docRect.left
                    }, 
                    key: (m.target as Element).getAttribute(NAME_ATTRIBUTE)
                }
            });

        let rectMap:any = { };
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

    return (
        <div 
            style={{ 
                ...props.style,
                display: "block", 
                transformOrigin: "0 0", 
                transform: `scale(${props.zoom})`, 
                position: "relative", 
                top: 0, 
                left: 0 
            }}
            ref={ref}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}>

            {props.children}

        </div>
    );
}