import * as React from "react";
import { Panel } from "../uiShell/controls/Panel";
import { classes } from "../uiShell/utils";
import { Title } from "../uiShell/controls/Title";
import { ComponentListSection } from "./ComponentListSection";
import { Block } from "../uiShell/Block";

interface Props {
    documentName: string
    style?: React.CSSProperties
    className?: string
}

export const DocumentEditorPanel:React.SFC<Props> = (props) => {

    return (
        <Panel appearFrom="left" key="cvep" style={props.style} className={classes("column", props.className)}>

            <Block palette="dark-grey-3" key="l1">

                <Title icon="folder-open" level="h1">{props.documentName}</Title>

            </Block>

            <ComponentListSection />

        </Panel>
    )
}