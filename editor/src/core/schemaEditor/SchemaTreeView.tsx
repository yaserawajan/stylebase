import * as React from "react";
import { PropMetadata, MapDataType, ArrayDataType } from "../doc/dataTypes/models";
import { Col } from "../../uiShell/layouts";
import { Block } from "../../uiShell/Block";
import { FolderTitle } from "../../uiShell/controls/FolderTitle";
import { Title } from "../../uiShell/controls/Title";
import { Stretcher } from "../../uiShell/controls";
import { arrayUnwrap, isArray } from "./utils";

interface SchemaNodeProps {
    name: string
    model: PropMetadata
    onSelect: (path: string) => void
}

const SchemaNode:React.SFC<SchemaNodeProps> = ({ model: modelRaw, name, onSelect }) => {

    const unwrappedModel = arrayUnwrap(modelRaw);
    const multiplicity = isArray(modelRaw);

    const handleChildSelect = (path: string) => {
        const appended = name + (name? "." : "") + path;
        onSelect(appended);
    }

    const handleClick = () => {
        onSelect(name);
    }

    if (unwrappedModel.type == "map") {
        const mapModel = unwrappedModel as MapDataType;
        return (
            <Col>
                <Block key="_parent" onClick={handleClick}>
                    <FolderTitle toggled>{name || "[$]"}{multiplicity && " [0 .. *]"}</FolderTitle>
                </Block>

                {Object.keys(mapModel.properties || {}).map(k => {
                    const node = mapModel.properties[k];
                    return (
                        <Block key={k} indent={[0, 0, 0, 2]}>
                            <SchemaNode 
                                name={k} 
                                model={node} 
                                onSelect={handleChildSelect} />
                        </Block>
                    )
                })}
            </Col>
        );
    }

    return (
        <Block onClick={handleClick}>
            <Title>{name}{multiplicity && " [0 .. *]"}</Title>
            <Stretcher />
            <Title>{unwrappedModel.type}</Title>
        </Block>
    )
}


interface Props {
    className?: string
    style?: React.CSSProperties
    
    model: PropMetadata
    selectedPath: string
    onSelect: (nodePath: string) => void
}

export const SchemaTreeView:React.SFC<Props> = (props) => {

    const multiplicity = isArray(props.model);
    const unwrappedModel = arrayUnwrap(props.model);
    

    if (unwrappedModel.type == "map") {
        return (
            <Col style={props.style} className={props.className}>
                <SchemaNode model={props.model} onSelect={props.onSelect} name="" />
            </Col>
        )
    }
    else {
        return (
            <Block>
                <Title>{unwrappedModel.type} {multiplicity && " [0 .. *]"}</Title>
            </Block>
        )
    }
}