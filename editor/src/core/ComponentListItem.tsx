import * as React from "react";
import { Block } from "../uiShell/Block";
import { Title } from "../uiShell/controls/Title";
import { Stretcher } from "../uiShell/controls";
import { Button } from "../uiShell/controls/Button";

interface Props {
    name: string
    selected: boolean
    onSelect: (name: string) => void
}

export const ComponentListItem:React.FC<Props> = ({ name, selected, onSelect }) => {

    const selectionChanger = (component: string) => () => onSelect(component);

    return (
        <Block 
            scale={3} 
            palette="light-grey-5" 
            indent={[0, 2]} 
            onClick={selectionChanger(name)}>
            <Title icon="microchip">
                {selected ? <strong>{name}</strong> : name}
            </Title>
            <Stretcher />
            <Button icon="pen" label="Rename" onClick={() => { }} />
        </Block>
    )
}