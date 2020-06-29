import * as React from "react";
import { Block } from "../uiShell/Block";
import { Col } from "../uiShell/layouts";
import { useSelector, shallowEqual } from "react-redux";
import { selectComponentMetadata } from "./doc/docLibSelectors";
import { Stretcher } from "../uiShell/controls";
import { DraggableParam } from "./DraggableParam";

interface Props {
    component: string
}

export const ComponentParamsDataSource:React.FC<Props> = ({ component }) => {

    const { propTypes } = useSelector(s => selectComponentMetadata(s, { component }), shallowEqual);

    return (
        <Col>
            {Object.keys(propTypes).map(paramName => {
                const param = propTypes[paramName];
                return (
                    <Block key={paramName} scale={3} palette="light-grey-5"> 
                        <Stretcher />
                        <DraggableParam name={paramName} type={param} />
                    </Block>
                )
            })}
        </Col>
    )
}