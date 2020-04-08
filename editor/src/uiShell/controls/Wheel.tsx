import "./wheel.css";

import * as React from "react";
import { classes } from "../utils";

type Orientation = "x" | "y" | "both"

interface Props {
    orientation?: Orientation
    className?: string
    style?: React.CSSProperties
    allowScrolling?: boolean
    visibleItems?: number
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

    const ref = React.useRef<HTMLDivElement>(null);

    const scroll = React.useCallback(() => {
        const el = findElement(ref.current, props.value);
        el.scrollIntoView();
    }, [props.value]);
    
    

    React.useEffect(() => {
        //setTimeout(scroll, 0);
        
        const el = findElement(ref.current, props.value);
        
        console.log(el.offsetLeft);
        ref.current.style.left = `${-el.offsetLeft}px`;
    }, [props.value, props.children]);

    return (
        <div key="d" className={classes("wheel", props.orientation, props.className)} style={props.style}>
            <div ref={ref} className={classes("wheel-sheet", props.orientation)}>
                <WheelItem name="" key="__default" />
                {props.children}
            </div>
        </div>
    );
}

interface WheelProps {
    name: string
}

export const WheelItem:React.SFC<WheelProps> = ({ name, children }) => {

    return (
        <div className="wheel-item" data-name={name} key="d">{children}</div>
    );
};

