import * as React from "react";
import { PropMetadata, MapDataType, ArrayDataType } from "../doc/docModels";
import { Row, Col } from "../../uiShell/layouts";
import { SchemaTreeView } from "./SchemaTreeView";
import { SchemaNodeEditor } from "./SchemaNodeEditor";
import { SchemaPath } from "./SchemaPath";
import { useSelector } from "react-redux";
import { selectDataTypes } from "../doc/docStateSelectors";
import { replaceNode, selectValue } from "./utils";

interface State {
    path: string
}

interface Props {
    style?: React.CSSProperties
    className?: string
    value: PropMetadata
    onChange: (value: PropMetadata) => void 
}




export const SchemaEditor:React.FC<Props> = (props) => {

    const dataTypes = useSelector(selectDataTypes()); 
    const [state, setState] = React.useState<State>({ path: "" });

    const handleSelect = (path: string) => {
        setState(s => ({ ...s, path }));
    }

    const handlePathForward = (name: string) => {
        const path = state.path == "" ? name : state.path + "." + name;
        setState(s => ({ ...s, path }));
    }

    const handleChange = (nodeValue: PropMetadata) => {
        const newValue = replaceNode(props.value, state.path, nodeValue);
        props.onChange(newValue);
    }

    return (
        <Row style={{ ...props.style, minHeight: 350, minWidth: 700 }} className={props.className}>
            <SchemaTreeView 
                style={{ width: "33%", alignSelf: "flex-start" }} 
                model={props.value} 
                selectedPath={state.path} 
                onSelect={handleSelect} />
            <Col style={{ width: "67%", alignSelf: "flex-start" }}>
                <SchemaPath model={props.value} path={state.path} onSelect={handleSelect} />
                <SchemaNodeEditor 
                    dataTypes={dataTypes}
                    value={selectValue(props.value, state.path)}
                    onChange={handleChange}
                    onSelect={handlePathForward} />
            </Col>
        </Row>
    );
}