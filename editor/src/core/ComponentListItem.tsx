import * as React from "react";
import { Block } from "../uiShell/Block";
import { Title } from "../uiShell/controls/Title";
import { Stretcher, ButtonGroup } from "../uiShell/controls";
import { Button } from "../uiShell/controls/Button";
import { useComponentRename } from "./uiState/useComponentRename";
import { ComponentNameEditor } from "./metadata/ComponentNameEditor";

interface Props {
    name: string
    selected: boolean
    onSelect: (name: string) => void
}

const stopPropagation = (fn: () => void) => (e:any) => {
    e.stopPropagation();
    fn();
}

const noOp = () => {}
export const ComponentListItem:React.FC<Props> = ({ name, selected, onSelect }) => {
    
    const { toggled, error, remount, handleCancel, handleEdit, handleSubmit } = useComponentRename(name);

    const selectionChanger = (component: string) => () => onSelect(component);

    return (
        <Block 
            scale={3} 
            palette="light-grey-5" 
            indent={[0, 2]} 
            onClick={selected ? noOp : selectionChanger(name)}>
            <Title icon="microchip">
                {selected ? <strong>{name}</strong> : name}
            </Title>
            <Stretcher />
            {selected &&
                <ButtonGroup>
                    <Button icon="pen" label="Rename" compact onClick={stopPropagation(handleEdit)} />
                    <Button icon="trash" label="Delete" compact onClick={() => {}} />
                </ButtonGroup>
            }
            {toggled && 
                <ComponentNameEditor 
                    error={error}
                    remount={remount}
                    value={name} 
                    onSubmit={handleSubmit}
                    onCancel={handleCancel} />
            }
        </Block>
    )
}