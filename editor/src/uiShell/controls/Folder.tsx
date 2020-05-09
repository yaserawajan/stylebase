import * as React from "react";
import { classes } from "../utils";
import { IconLA } from "./IconLA";

interface Props {
    style?: React.CSSProperties
    className?: string
    toggled?: boolean
    marked?: boolean
    title: string
    renderSummary?: (toggled:boolean) => React.ReactNode
    onToggle?: () => void
}

export const Folder:React.SFC<Props> = (props) => {

    const handleClick = () => {
        if (props.onToggle) props.onToggle();
    }

    return (
        <div onClick={handleClick} className={classes("folder row edge-bottom", props.className)}>
            <div key="toggler" className="icon">
                <IconLA 
                    icon="angle-right" 
                    className={classes("animate", props.toggled && "rotate-90-cw")} />
            </div>
            <div key="title" className="text" style={{ fontWeight: props.marked? "bold" : "normal" }}>{props.title}</div>
            <div key="s1" className="stretch" />
            <div key="summary" className="summary">
                {props.renderSummary && props.renderSummary(props.toggled)}
            </div>
        </div>  
    )
}