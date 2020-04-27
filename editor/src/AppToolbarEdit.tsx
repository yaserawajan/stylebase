import * as React from "react";
import { Section } from "./uiShell/controls/Section";
import { Command } from "./uiShell/controls/Command";

interface Props {

}

export const AppToolbarEdit:React.FC<Props> = (props) => {

    return (
        <Section>
            <Command key="undo" name="undo" label="Undo" icon="undo" />
            <Command key="redo" name="redo" label="Redo" icon="redo" />
            <Command key="cut" name="cut" label="Cut" icon="cut" />
            <Command key="copy" name="copy" label="Copy" icon="copy" />
            <Command key="paste" name="paste" label="Paste" icon="paste" />
            <Command key="delete" name="delete" label="Delete" icon="trash" />
        </Section>
    )
}