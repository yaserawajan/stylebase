import * as React from "react";
import { PropMapMetadata } from "../doc/docModels";
import { Title } from "../../uiShell/controls/Title";
import { Button } from "../../uiShell/controls/Button";
import { Block } from "../../uiShell/Block";
import { Col, Row } from "../../uiShell/layouts";
import { Stretcher } from "../../uiShell/controls";

interface Props {
    value: PropMapMetadata
    onChange?: (value: PropMapMetadata) => void
}

export const ComponentsParamsSection:React.SFC<Props> = ({ value, onChange }) => {

    const params = Object.keys(value).map(k => ({ name: k, paramType: value[k] }));

    return (
        <>
            <Block scale={3} palette="light-grey-4" key="title">
                <Title level="h2">Parameters</Title>
            </Block>

            <Block scale={3} palette="light-grey-5" key="body" indent={[0, 2]}>
                <Col>
                    <Row>
                        <Title>No Parameters</Title>
                        <Stretcher />
                        <Button icon="plus" label="Add" />
                    </Row>
                </Col>
            </Block>
        </>
    )
}