import * as React from "react";
import { Row, Col } from "../../uiShell/layouts";
import { MapPropDesc, PropMetadata, MapDataType } from "../doc/docModels";
import { Title } from "../../uiShell/controls/Title";
import { Stretcher, Divider } from "../../uiShell/controls";
import { Block } from "../../uiShell/Block";
import { Switch } from "../../uiShell/controls/Switch";
import { Button } from "../../uiShell/controls/Button";
import { QuickAddForm } from "../../uiShell/controls/QuickAddForm";
import { FormField } from "../../uiShell/controls/FormField";

interface MapAttributeProps {
    name: string
    model: MapPropDesc
    onChange: (value: MapPropDesc) => void
    onSelect: (name: string) => void
    onRemove: (name: string) => void
}

const MapAttribute:React.SFC<MapAttributeProps> = (props) => {

    const handleRequiredChange = (required: boolean) => {
        props.onChange({ ...props.model, required });
    }

    const handleSelect = () => {
        props.onSelect(props.name);
    }

    const handleDelete = () => {
        props.onRemove(props.name);
    }

    return (
        <Block>
            <Title onClick={handleSelect}>{props.name}</Title>
            <Stretcher />
            
            <Switch value={props.model.required} onChange={handleRequiredChange} />
            <Title>&nbsp;Required</Title>
            <Divider />    
            <Button compact icon="trash" label="Delete" onClick={handleDelete} />
        </Block>
    )
}

interface Props {
    value: MapDataType
    onChange: (value: PropMetadata) => void
    onSelect: (propName: string) => void
}

export const SchemaMapEditor:React.FC<Props> = ({ value, onChange, onSelect }) => {

    const attributes = value.properties || {};

    const changeHandler = (name: string) => (nodeValue: MapPropDesc) => {
        onChange({
            ...value,
            properties: {
                ...attributes,
                [name]: nodeValue
            }
        })
    }

    const handleRemove = (name: string) => {
        const { [name]: _, ...afterDeletion } = attributes;
        onChange({
            ...value,
            properties: afterDeletion
        })
    }

    const handleAdd = (name: string) => {
        onChange({
            ...value,
            properties: {
                ...attributes,
                [name]: {
                    type: "text"
                }
            }
        })
    }

    

    const validateNewName = (paramName: string) => {
        if (!(/^[$A-Z_a-z][0-9A-Z_a-z$]*$/.test(paramName))) {
            return false;
        }
        else if (Object.keys(attributes).indexOf(paramName) !== -1) {
            return false;
        }

        return true;
    } 

    return (
        <Col>
            <Block>
                <Title level="h2">Properties</Title>
            </Block>
            <Col>
                {Object.keys(attributes).map(propName => {
                    const model = attributes[propName];
                    return (
                        <MapAttribute 
                            key={propName} 
                            model={model} 
                            name={propName}
                            onChange={changeHandler(propName)}
                            onRemove={handleRemove}
                            onSelect={onSelect} />
                    )
                })}
            </Col>
            <QuickAddForm 
                validator={validateNewName}
                title="Add New Property" 
                onAdd={handleAdd} />
        </Col>
    )
}