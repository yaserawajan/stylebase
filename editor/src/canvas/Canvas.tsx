import * as React from "react";
import Ruler from "@scena/react-ruler";
import "./canvas.css";
import { DocumentView } from "./DocumentView";
import { ElementRectMap } from "./types";
import RectContext from "./RectContext";
import { ZoomControl } from "./ZoomControl";
 
interface Props {
    documentMargins: number
    top: number
    left: number
    bottom: number
    right: number
    zoom: number
    contents: JSX.Element
    onHover?: (elementName?: string, x?: number, y?: number) => void
    onClick?: (elementName?: string, x?: number, y?: number) => void
    onZoomChange?: (newValue: number) => void
}

export const Canvas:React.SFC<Props> = ({ 
        top, right, bottom, left, 
        zoom, 
        onZoomChange,
        children, 
        contents, 
        documentMargins, 
        onHover, 
        onClick 
    }) => {
    
    const [ rects, setRects ] = React.useState<ElementRectMap>({});
    const hRulerTop = React.useRef<Ruler>(null);
    const vRulerLeft = React.useRef<Ruler>(null);
    const vRulerRight = React.useRef<Ruler>(null);

    const sync = () => {
        const x = window.scrollX / zoom;
        const y = window.scrollY / zoom;
        hRulerTop.current.scroll(x - documentMargins);
        vRulerLeft.current.scroll(y - documentMargins);
        vRulerRight.current.scroll(y - documentMargins);
    }

    const handleScroll = () => requestAnimationFrame(sync);
    
    const handleResize = () => {
        hRulerTop.current.resize();
        vRulerLeft.current.resize();
        vRulerRight.current.resize();
    }

    const handleRectChange = (rectMap: ElementRectMap) => {
        setRects(state => ({ ...state, ...rectMap }));
    }

    React.useEffect(() => {

        sync();
        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };

    }, [right, left, zoom]);
    
    return (
        <>
            <div key="tr" className="canvas-x-ruler" style={{ top, right, left: left + 40 + 30 }}>
                <Ruler textColor="#999" zoom={zoom} ref={hRulerTop} type="horizontal" />
            </div>
            <div key="br" className="canvas-footer" style={{ bottom, right, left: left + 40 + 30 }}>
                <ZoomControl value={zoom} onChange={onZoomChange} />
            </div>
            <div key="lr" className="canvas-y-ruler" style={{ top, left, bottom }}>
                <Ruler textColor="#999" zoom={zoom} ref={vRulerLeft} type="vertical" />
            </div>
            <div key="rr" className="canvas-y-ruler" style={{ top, right, bottom, transform: "scale(-1, 1)" }}>
                <Ruler textColor="#999" zoom={zoom} ref={vRulerRight} type="vertical" />
            </div>

            <div key="background" className="canvas-background" style={{
                top: 40 + 30 + top,
                left: 40 + 30 + left, 
                bottom: 30 + bottom,
                right: 30 + 40 + right
            }} />

            <div key="body" 
                style={{ 
                        position: "absolute", 
                        overflow: "visible", 
                        zIndex: 100, 
                        top: 40 + 30 + top,
                        display: "block",
                        left: 40 + 30 + left 
                    }}>

                <div key="outlines" style={{ position: "relative"  }}>
                    <RectContext.Provider value={{ rectMap: rects }}>
                        {children}
                    </RectContext.Provider>
                </div>

                <DocumentView 
                    key="root"
                    contents={contents}
                    margins={documentMargins}
                    zoom={zoom}
                    style={{
                        paddingBottom: (30 + bottom) / zoom, 
                        paddingRight: (30 + 40 + right) / zoom,
                    }}
                    onHover={onHover}
                    onClick={onClick}
                    onRectChange={handleRectChange} />
                
            </div>
        </>
    );
}