import * as React from "react";
import { Title } from "../uiShell/controls/Title";
import { PropMetadata } from "./doc/dataTypes/models";
import { Block } from "../uiShell/Block";
import { IconLA } from "../uiShell/controls/IconLA";
import { Button } from "../uiShell/controls/Button";

interface Props {
    name: string
    type: PropMetadata
}

export const DraggableParam:React.SFC<Props> = ({ name, type }) => {

    return (
        
            <Button icon="plug" compact label="assign" />
        
    )
}