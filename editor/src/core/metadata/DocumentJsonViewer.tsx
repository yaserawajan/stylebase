import * as React from "react";
import { DocFormat } from "../doc/docModels";
import { DocState, DocSelection } from "../doc/state/stateModels";
import { Modal } from "../../uiShell/controls/Modal";
import { Block } from "../../uiShell/Block";
import { useDocEditorState } from "../../patterns/docEditor/docEditorHooks";
import { DocEditorState } from "../../patterns/docEditor/docEditorState";
import { exportDocState } from "../doc/docExportUtils";

interface Props {
    onClose: () => void
}

export const DocumentJsonViewer:React.SFC<Props> = (props) => {

    const doc = useDocEditorState((s:DocEditorState<DocState,DocSelection>) => exportDocState(s.present.data));

    return (
        <Modal title="Copy-Paste Document JSON" onCancel={props.onClose}>
            <Block key="d1" scale={4} palette="light-grey-5" indent={[0, 2]} >

                <textarea readOnly style={{ fontSize: "10px", lineHeight: 1.15, fontFamily: "monospace", minHeight: "300px" }}>{JSON.stringify(doc, null, 2) }</textarea>
        
            </Block>
        </Modal>
    )
}