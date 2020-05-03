import "./wheel.less";

import * as React from "react";
import { classes } from "../utils";

type Orientation = "x" | "y" | "both"

type WheelContext = {
    value: string
}

const wheelContext = React.createContext<WheelContext>({
    value: undefined
})

interface Props {
    orientation?: Orientation
    className?: string
    style?: React.CSSProperties
    //allowScrolling?: boolean
    //visibleItems?: number
    value?: string
    
}

const findElement = (parent:HTMLElement, name: string):HTMLElement => {
    const itemDoms = parent.children;
    let domDefault:HTMLElement = null;
    let domMap: { [k:string]: HTMLElement } = {};
    const l = itemDoms.length;
    for (let i = 0; i < l; ++i) {
        const itemDom = itemDoms[i];
        if (!itemDom.matches || !itemDom.matches(".wheel-item")) continue;
        const n = (itemDom as HTMLElement).dataset.name;
        if (n !== "") domMap[n] = itemDom as HTMLElement;
        else domDefault = itemDom as HTMLElement;
    }
    return domMap[name] || domDefault;
}

export const Wheel:React.SFC<Props> = (props) => {

    //const ref = React.useRef<HTMLDivElement>(null);
    
    // React.useEffect(() => {
    //     const el = findElement(ref.current, props.value);
    //     ref.current.style.left = `${-el.offsetLeft}px`;
    // }, [props.value, props.children]);



    return (
        <wheelContext.Provider value={{ value: props.value }}>
            <div className={classes("row", props.className)}>
                
                <WheelItem name="" key="__default"  />

                {props.children}
            </div>
            
        </wheelContext.Provider>
    );
}

// export const Wheel:React.SFC<Props> = (props) => {

//     const ref = React.useRef<HTMLDivElement>(null);
    
//     React.useEffect(() => {
//         const el = findElement(ref.current, props.value);
//         ref.current.style.left = `${-el.offsetLeft}px`;
//     }, [props.value, props.children]);

//     return (
//         <div key="d" className={classes("wheel", props.className)} style={props.style}>
//             <div ref={ref} className={classes("wheel-sheet", props.orientation)}>
//                 <WheelItem name="" key="__default" />
//                 {props.children}
//             </div>
//         </div>
//     );
// }

interface WheelItemProps {
    name: string
    className?: string
    style?: React.CSSProperties
}

export const WheelItem:React.SFC<WheelItemProps> = ({ name, children, className, style }) => {

    const { value } = React.useContext(wheelContext);
    const selected = value === name;
    return selected
        ? <div style={{ width: "100%" }}>{children}</div>
        : null
};

