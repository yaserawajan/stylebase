import * as React from "react";
import { PropMapMetadata } from "../doc/docModels";
import { Title } from "../../uiShell/controls/Title";
import { Button } from "../../uiShell/controls/Button";
import { Block } from "../../uiShell/Block";
import { Col, Row, Fluid } from "../../uiShell/layouts";
import { Stretcher } from "../../uiShell/controls";
import { FormField } from "../../uiShell/controls/FormField";
import { Input } from "../../uiShell/controls/Input";
import { InputArea } from "../../uiShell/controls/InputArea";
import { useDispatch } from "react-redux";
import { actionUpdate } from "../../patterns/docEditor/docEditorState";
import { componentParamAdd } from "../doc/docActions";

interface State {
    paramNameError?: string
    newParamName: string
}

interface Props {
    component: string
    value: PropMapMetadata
}

export const ComponentsParamsSection:React.SFC<Props> = ({ component, value }) => {

    const [{ newParamName, paramNameError }, setState] = React.useState<State>({ newParamName: "" });
    const dispatch = useDispatch();

    const params = Object.keys(value).map(k => ({ name: k, paramType: value[k] }));

    const handleChange = (paramName: string) => {

        let error:string = undefined;
        if (!(/^[$A-Z_a-z][0-9A-Z_a-z$]*$/.test(paramName))) {
            error = "Invalid name";
        }
        else if (Object.keys(value).indexOf(paramName) !== -1) {
            error = "Duplicate name";
        }
        
        setState(s => ({ ...s, newParamName: paramName, paramNameError: error }));
    }

    const handleAdd = () => {
        dispatch(actionUpdate(componentParamAdd(component, newParamName, { type: "text" }, false, "")));
        setState(s => ({ ...s, newParamName: "", paramNameError: undefined }));
    }

    return (
        <>
            <Block scale={3} palette="light-grey-4" key="title">
                <Title level="h2">Parameters</Title>
            </Block>

            <Block scale={3} palette="light-grey-5" key="body" indent={[0, 2]}>
                <Col>
                    {(params.length < 1) && 
                        <Row key="no-params">
                            <Title>No Parameters</Title>
                        </Row>
                    }

                    {Object.keys(value).map(paramName => {
                        const param = value[paramName];
                        return (
                            <Row key={paramName}>
                                <Title>{paramName}</Title>
                                <Stretcher />
                                <Title>{param.type}</Title>
                            </Row>
                        )
                    })}

                    <Fluid key="__footer">
                        <FormField name="New Parameter" className="stretch">
                            <InputArea>
                                <Input value={newParamName} onChange={handleChange} placeholder="Enter Name ..." />
                            </InputArea>
                        </FormField>
                        <Button icon="plus" label="Add" 
                            disabled={newParamName.length < 1 || !!paramNameError} 
                            onClick={handleAdd} />
                    </Fluid>
                </Col>
            </Block>
        </>
    )
}