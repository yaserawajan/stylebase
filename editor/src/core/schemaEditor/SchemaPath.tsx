import * as React from "react";
import { PropMetadata } from "../doc/docModels";
import { Row } from "../../uiShell/layouts";
import { Block } from "../../uiShell/Block";
import { Title } from "../../uiShell/controls/Title";
import { Divider, Stretcher } from "../../uiShell/controls";
import { FolderTitle } from "../../uiShell/controls/FolderTitle";

interface Props {
    style?: React.CSSProperties
    className?: string
    model: PropMetadata
    path: string
    onSelect: (path: string) => void
}

export const SchemaPath:React.SFC<Props> = (props) => {

    const segments = props.path.split('.').filter(s => !!s);

    const selectHandler = (name: string) => () => {
        props.onSelect(name);
    }

    return (
        <Block>
            <Title key="9oot" onClick={selectHandler("")}>[$]</Title> 
            {segments.map(s => (
                <FolderTitle key={s}>{s}</FolderTitle>))}
            <Stretcher />
        </Block>
    )
}