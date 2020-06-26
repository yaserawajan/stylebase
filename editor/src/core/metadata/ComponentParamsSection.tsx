import * as React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Title } from "../../uiShell/controls/Title";
import { Button } from "../../uiShell/controls/Button";
import { Block } from "../../uiShell/Block";
import { Col, Row, Fluid } from "../../uiShell/layouts";
import { FormField } from "../../uiShell/controls/FormField";
import { Input } from "../../uiShell/controls/Input";
import { InputArea } from "../../uiShell/controls/InputArea";
import { actionUpdate } from "../../patterns/docEditor/docEditorState";
import { componentParamAdd, componentParamRemove, componentParamUpdate } from "../doc/docActions";
import { ComponentParamItem } from "./ComponentParamItem";
import { selectComponentMetadata } from "../doc/docLibSelectors";
import { PropMetadata } from "../doc/dataTypes/models";
import { QuickAddForm } from "../../uiShell/controls/QuickAddForm";

interface State {
    paramNameError?: string
    newParamName: string
}

interface Props {
    component: string
    //params: PropMapMetadata
}

export const ComponentParamsSection:React.SFC<Props> = ({ component }) => {
    const { propTypes } = useSelector(s => selectComponentMetadata(s, { component }), shallowEqual);
    
    const dispatch = useDispatch();

    const params = Object.keys(propTypes).map(k => ({ name: k, paramType: propTypes[k] }));

    const validateNewName = (paramName: string) => {
        if (!(/^[$A-Z_a-z][0-9A-Z_a-z$]*$/.test(paramName))) {
            return false;
        }
        else if (Object.keys(propTypes).indexOf(paramName) !== -1) {
            return false;
        }

        return true;
    } 

    const handleParamChange = (name: string, value: PropMetadata) => {
        dispatch(actionUpdate(componentParamUpdate(component, name, value, false)));
    }

    const handleParamRemove = (name: string) => {
        dispatch(actionUpdate(componentParamRemove(component, name)));
    }

    const handleAdd = (name: string) => {
        const action = actionUpdate(componentParamAdd(component, name, { type: "text" }, false, ""));
        dispatch(action);
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

                    {Object.keys(propTypes).map(paramName => {
                        const param = propTypes[paramName];
                        return (
                            <ComponentParamItem 
                                key={paramName} 
                                name={paramName} 
                                data={param}
                                onChange={handleParamChange}
                                onRemove={handleParamRemove} />)
                    })}

                    <QuickAddForm 
                        title="Add Parameter" 
                        onAdd={handleAdd} 
                        validator={validateNewName} />

                </Col>
            </Block>
        </>
    )
}