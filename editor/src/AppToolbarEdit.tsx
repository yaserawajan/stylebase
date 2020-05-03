import * as React from "react";
import { Section } from "./uiShell/controls/Section";
import { Button } from "./uiShell/controls/Button";

interface Props {

}

export const AppToolbarEdit:React.FC<Props> = (props) => {

    return (
        <div className="group">
            <Button key="undo" name="undo" label="Undo" icon="undo" />
            <Button key="redo" name="redo" label="Redo" icon="redo" />
            <Button key="cut" name="cut" label="Cut" icon="cut" />
            <Button key="copy" name="copy" label="Copy" icon="copy" />
            <Button key="paste" name="paste" label="Paste" icon="paste" />
            <Button className="palette-warning dark" key="delete" name="delete" label="Delete" icon="trash" />
        </div>
    )
}