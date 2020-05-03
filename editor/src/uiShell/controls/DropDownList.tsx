import * as React from "react";
import { IconLA } from "../IconLA";
import { classes } from "../utils";
import { Wheel, WheelItem } from "./Wheel";

interface Props {
    style?: React.CSSProperties
    className?: string
    label: string
    value: string
    allValues: string[]
    onChange?: (value: string) => void
}

export const DropDownList:React.SFC<Props> = (props) => {

    const handlePrevious = React.useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        const index = props.allValues.indexOf(props.value);
        if (index <= 0) return;
        props.onChange(props.allValues[index - 1]);
    }, [props.value, props.allValues]); 

    const handleNext = React.useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        const index = props.allValues.indexOf(props.value);
        if (index < 0 || (index >= props.allValues.length - 1)) return;
        props.onChange(props.allValues[index + 1]);
    }, [props.value, props.allValues]);

    return (
        <div style={props.style} className={classes("drop-down-list row", props.className)} >
        
            <div key="prev" className="icon"><IconLA onClick={handlePrevious} icon="angle-left" /></div>

            <Wheel orientation="x" value={props.value} className="stretch">
                {props.allValues.map(v => (
                    <WheelItem name={v} key={v}>
                        <div key="v" className="text text-center">{v}</div>
                    </WheelItem>
                ))}
            </Wheel>

            <div key="next" className="icon"><IconLA onClick={handleNext} size="fa-lx" icon="angle-right" /></div>
            
        </div>
    );
}

