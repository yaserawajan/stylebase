import * as React from "react";

import { Block } from "../Block";
import { FolderTitle } from "./FolderTitle";
import { Col } from "../layouts";
import { Stretcher } from ".";

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
        <Col>
            <Block key="header" onClick={handleClick} className={props.className} style={props.style}>
                <FolderTitle toggled={props.toggled} onToggle={handleClick}>{props.title}</FolderTitle>
                <Stretcher />
                {props.renderSummary && props.renderSummary(props.toggled)}
            </Block>

            {props.toggled && 
                <Block key="body" indent={[0, 1]}>
                    {props.children}
                </Block>
            }
        </Col>  
    )
}