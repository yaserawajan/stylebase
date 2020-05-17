import * as React from "react";

import { Button } from "../uiShell/controls/Button";
import { Modal } from "../uiShell/controls/Modal";
import { Block } from "../uiShell/Block";
import { Stretcher } from "../uiShell/controls";


interface Props {
    title: string
    actionTitle?: string
    canSubmit?: boolean
    onSubmit?: () => void
    onCancel?: () => void
}

export const ModalForm:React.FC<Props> = ({ canSubmit = false, actionTitle = "Ok", title, onSubmit, onCancel, children }) => {


    return (
        <Modal onCancel={onCancel} title={title}>
            <Block key="d1" scale={3} palette="light-grey-5" indent={[0, 2]}>

                { children }
                
            </Block>

            <Block key="d2" scale={3} palette="light-grey-3" indent={[0, 2]}>

                <Button label="Cancel" onClick={onCancel} />

                <Stretcher />

                <Button label={actionTitle} onClick={onSubmit} disabled={!canSubmit} />
            
            </Block>
        </Modal>
    );
}