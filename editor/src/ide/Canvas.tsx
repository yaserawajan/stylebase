import * as React from "react";
import Ruler from "@scena/react-ruler";
import { BodyStyler } from "./BodyStyler";
 
const xRulerCss:React.CSSProperties = {
    position: "fixed",
    backgroundColor: "#333333"
};

const yRulerCss:React.CSSProperties = {
    position: "fixed",
    display: "block", 
    width: "30px"
    
};

interface Props {
    top: number
    left: number
    bottom: number
    right: number
    zoom: number
}

export const Canvas:React.SFC<Props> = ({ top, right, bottom, left, zoom }) => {
    //<Ruler ref={hRulerBottom} type="horizontal" />
    const hRulerTop = React.useRef<Ruler>(null);
    //const hRulerBottom = React.useRef<Ruler>(null);
    const vRulerLeft = React.useRef<Ruler>(null);
    const vRulerRight = React.useRef<Ruler>(null);

    const sync = () => {
        //console.log(zoom);
        const x = window.scrollX / zoom;
        const y = window.scrollY / zoom;// + 206);// + 206) / zoom;// / zoom;

        hRulerTop.current.scroll(x);
        //hRulerBottom.current.scroll(window.scrollX);
        vRulerLeft.current.scroll(y);
        vRulerRight.current.scroll(y);
    }

    const handleScroll = (e:Event) => {

        requestAnimationFrame(sync);
    }

    const handleResize = () => {
        hRulerTop.current.resize();
        //hRulerBottom.current.resize();
        vRulerLeft.current.resize();
        vRulerRight.current.resize();
    }

    React.useEffect(() => {

        sync();
        handleResize();
        
    }, [right, left, zoom]);

    React.useEffect(() => {

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [right, left, zoom]);

    const thickness = 30 + 40;
    const borderTop = `${30 + 40}px solid #333333`;
    const borderBottom = `${30}px solid #333333`;
    const hBorder = `${40}px solid #333333`;
    return (
        <>
            <BodyStyler 
                key="bs"
                style={{ 
                    paddingTop: `${ 30 + 40 + top }px`, 
                    paddingLeft: `${ 30 + 40 + left }px`,
                    paddingBottom: `${ 30 + bottom }px`, 
                    paddingRight: `${ 30 + 40 + right }px`,
                 }} />
            
            <div key="tr" style={{ ...xRulerCss, top, right, left: left + 40 + 30, height: thickness, borderTop: "40px solid #333333" }}>
                <Ruler zoom={zoom} ref={hRulerTop} type="horizontal" />
            </div>
            <div key="br" style={{ ...xRulerCss, bottom, right, left: left + 40 + 30, height: 30 }}>
                
            </div>

            <div key="lr" style={{ ...yRulerCss, top, left, bottom, width: thickness, borderTop, borderBottom, borderLeft: hBorder }}>
                <Ruler zoom={zoom} ref={vRulerLeft} type="vertical" />
            </div>
            <div key="rr" style={{ ...yRulerCss, top, right, bottom, width: thickness, borderTop, borderBottom, borderLeft: hBorder , transform: "scale(-1, 1)"}}>
                <Ruler zoom={zoom} ref={vRulerRight} type="vertical" />
            </div>
            <div key="body" style={{ display: "block", zoom }}>
                <div style={{ width: 100, height: 100, backgroundColor: "green", color: "white" }}>
                    1
                </div>
                <div style={{ width: 100, height: 100, backgroundColor: "darkred", color: "white" }}>
                    2
                </div>
                <div style={{ width: 100, height: 100, backgroundColor: "blue", color: "white" }}>
                    3
                </div>
                <div style={{ width: 100, height: 100, backgroundColor: "darkred", color: "white" }}>
                    4
                </div>
                <div style={{ width: 100, height: 100, backgroundColor: "green", color: "white" }}>
                    5
                </div>
                <div style={{ width: 100, height: 100, backgroundColor: "darkred", color: "white" }}>
                    6
                </div>
                <div style={{ width: 100, height: 100, backgroundColor: "green", color: "white" }}>
                    7
                </div>
                <div style={{ width: 100, height: 100, backgroundColor: "darkred", color: "white" }}>
                    8
                </div>
            </div>
        </>
    );
}