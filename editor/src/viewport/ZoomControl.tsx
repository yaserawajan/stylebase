import * as React from "react";
import { IconLA } from "../uiShell/controls/IconLA";
import "./zoom_control.less"

const classes = (...args:string[]) => args.filter(a => !!a).join(" ");

interface Props {
    style?: React.CSSProperties
    className?: string
    value:number
    onChange: (value:number) => void
}

export const ZoomControl:React.SFC<Props> = (props) => {

    const handleChange = (e:any) => {
        props.onChange(e.target.value);
    }

    return (
        <div className={classes(props.className, "zoom-control")} style={props.style}>
            <div className="value">{props.value * 100}%</div>
            <div className="minus">
                <IconLA icon="search-minus" />
            </div>
            <input 
                value={props.value} 
                onChange={handleChange}
                type="range" 
                step={0.25} 
                min={0.25} 
                max={8} 
                className="slider" />
            <div className="plus">
                <IconLA icon="search-plus" />
            </div>
        </div>
    );
}