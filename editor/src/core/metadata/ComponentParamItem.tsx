import * as React from "react";
import { PropMetadata } from "../doc/dataTypes/models";
import { Row } from "../../uiShell/layouts";
import { Title } from "../../uiShell/controls/Title";
import { Stretcher, Divider, ButtonGroup } from "../../uiShell/controls";
import { Button } from "../../uiShell/controls/Button";
import { ComponentParamTypeEditor } from "./ComponentParamTypeEditor";

interface Props {
    name: string
    data: PropMetadata
    onChange?: (name: string, value: PropMetadata) => void
    onRemove?: (name: string) => void
}

interface State {
    editToggled: boolean
    
}

export const ComponentParamItem:React.FC<Props> = (props) => {

    const [{ editToggled }, setState] = React.useState<State>({ editToggled: false });

    const handleEdit = () => {
        setState(s => ({ ...s, editToggled: true }));
    }

    const handleCancel = () => setState(s => ({ ...s, editToggled: false }));

    const handleRemove = () => {
        if (props.onRemove) props.onRemove(props.name);
    }

    const handleChange = (value: PropMetadata) => {
        if (props.onChange) {
            props.onChange(props.name, value);
        }
        
        setState(s => ({ ...s, editToggled: false }));
    }


    return (
        <Row>
            <Title>{props.name}</Title>
            <Stretcher />
            <Title>{props.data.type}</Title>
            <Divider />
            <ButtonGroup>
                <Button key="edit" label="Edit" icon="pen" compact onClick={handleEdit} />
                <Button key="delete" label="Delete" icon="trash" compact onClick={handleRemove} />
            </ButtonGroup>

            {editToggled &&
                <ComponentParamTypeEditor 
                    name={props.name} 
                    initValue={props.data} 
                    
                    onSubmit={handleChange}
                    onCancel={handleCancel} />
            }
            
        </Row>
    )
}

