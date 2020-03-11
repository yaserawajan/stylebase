import * as React from "react";
import { IconLA } from "./IconLA";

const css:React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    color: "#eee",
    width: "auto"
}

const leftCss:React.CSSProperties = {
    //flex: "0 0 30px",
    //width: 40,
    padding: "0 5px 0 0"
}

const rightCss:React.CSSProperties = {
    //flex: "0 0 30px",
    //width: 40,
    padding: "0 0 0 5px"
}

const sliderCss:React.CSSProperties = {
    flex: "1 1 auto"
    //flex: "0 0 120px"
}

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

        <div className={props.className} style={{ ...css, ...props.style}}>
            <div style={{ width: 40 }}>
                {`${props.value * 100}%`}
            </div>
            <div style={leftCss}>
                <IconLA icon="search-minus" />
            </div>
            <input 
                value={props.value} 
                onChange={handleChange}
                type="range" 
                step={0.25} 
                min={0.25} 
                max={4} 
                style={sliderCss} />
            <div style={rightCss}>
                <IconLA icon="search-plus" />
            </div>
        </div>

    );

}