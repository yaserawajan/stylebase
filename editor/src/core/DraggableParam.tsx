import * as React from "react";
import { Title } from "../uiShell/controls/Title";
import { PropMetadata } from "./doc/dataTypes/models";
import { Block } from "../uiShell/Block";
import { IconLA } from "../uiShell/controls/IconLA";

interface Props {
    name: string
    type: PropMetadata
}

export const DraggableParam:React.SFC<Props> = ({ name, type }) => {

    return (
        <Block scale={3}>
            <Title>{name}</Title>
            <IconLA icon="plug" size="sm" />
        </Block>
    )
}