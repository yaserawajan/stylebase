import * as React from "react";
import { Panel } from "../uiShell/controls/Panel";
import { classes } from "../uiShell/utils";
import { Title } from "../uiShell/controls/Title";
import { ComponentListSection } from "./ComponentListSection";
import { Block } from "../uiShell/Block";
import { Button } from "../uiShell/controls/Button";
import { Stretcher } from "../uiShell/controls";
import { Modal } from "../uiShell/controls/Modal";
import { DocumentJsonViewer } from "./metadata/DocumentJsonViewer";

interface Props {
    documentName: string
    style?: React.CSSProperties
    className?: string
}

export const DocumentEditorPanel:React.SFC<Props> = (props) => {

    const [jsonVisible, setJsonVisible] = React.useState(false);

    return (
        <Panel appearFrom="left" key="cvep" style={props.style} className={classes("column", props.className)}>

            <Block palette="dark-grey-3" key="l1" scale={1}>

                <Title icon="folder-open" level="h1">{props.documentName}</Title>

            </Block>

            <Block palette="dark-grey-4" key="l2" scale={2}>
                <Stretcher />
                <Button icon="code" label="Export JSON" onClick={() => setJsonVisible(true)} />
                <Stretcher />
            </Block>

            <ComponentListSection />

            {jsonVisible && <DocumentJsonViewer onClose={() => setJsonVisible(false)} />}

        </Panel>
    )
}