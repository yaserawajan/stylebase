import * as React from "react";
import { PropMetadata, MapDataType } from "../doc/dataTypes/models";
import { Fluid, Col } from "../../uiShell/layouts";
import { FormField } from "../../uiShell/controls/FormField";
import { InputArea } from "../../uiShell/controls/InputArea";
import { DropDownList } from "../../uiShell/controls/dropDownList/DropDownList";
import { DropDownListItem } from "../../uiShell/controls/dropDownList/DropDownListItem";
import { Block } from "../../uiShell/Block";
import { Title } from "../../uiShell/controls/Title";
import { SchemaMapEditor } from "./SchemaMapEditor";
import { Switch } from "../../uiShell/controls/Switch";
import { parseType, arrayUnwrap, isArray, arrayWrap, createTypeDefault } from "./utils";
import { Stretcher } from "../../uiShell/controls";



interface Props {
    className?: string
    style?: React.CSSProperties
    dataTypes: string[]
    value: PropMetadata
    onChange: (value: PropMetadata) => void
    onSelect: (name: String) => void
}




export const SchemaNodeEditor:React.SFC<Props> = (props) => {

    const unwrappedValue = arrayUnwrap(props.value);
    const multiplicity = isArray(props.value);

    const setType = (typeUri: string) => {
        const { lib, type } = parseType(typeUri);
        if (unwrappedValue.type == type && (unwrappedValue as any).lib == lib) return;
        props.onChange(arrayWrap(createTypeDefault(typeUri), multiplicity));
    }

    const setArgs = (args: PropMetadata) => {
        props.onChange(arrayWrap(args, multiplicity));
    }

    const setArray = (newMultiplicity: boolean) => {
        if (multiplicity === newMultiplicity) return;
        props.onChange(arrayWrap(unwrappedValue, newMultiplicity));
    }

    return (
        <Col>
            <Fluid>
                <FormField name="Data Type" className="occupy-half" key="type">
                    <InputArea>
                        <DropDownList value={unwrappedValue.type} onChange={setType}>
                            {props.dataTypes
                                .filter(d => d != "array")
                                .map(dataType => (
                                    <DropDownListItem key={dataType} value={dataType}>
                                        <Block>
                                            <Title>{dataType}</Title>
                                        </Block>
                                    </DropDownListItem>
                                ))}
                        </DropDownList>
                    </InputArea>
                </FormField>

                <FormField name="Multiplicity" className="occupy-half" key="mul">
                    <Switch value={multiplicity} onChange={setArray} />
                    <Stretcher />
                </FormField>
            </Fluid>

            {(unwrappedValue.type == "map") &&
                <SchemaMapEditor 
                    value={unwrappedValue as MapDataType} 
                    onChange={setArgs}
                    onSelect={props.onSelect} />}
        </Col>
    )
}

