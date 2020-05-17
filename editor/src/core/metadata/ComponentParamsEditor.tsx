import * as React from "react";
import { PropMapMetadata } from "../doc/docModels";
import { Title } from "../../uiShell/controls/Title";
import { Button } from "../../uiShell/controls/Button";
import { Block } from "../../uiShell/Block";

interface Props {
    value: PropMapMetadata
    onChange?: (value: PropMapMetadata) => void
}

export const ComponentsParamsEditor:React.SFC<Props> = ({ value, onChange }) => {

    const params = Object.keys(value).map(k => ({ name: k, paramType: value[k] }));

    return (
        <>
            <Block scale={3} palette="light-grey-4">
                <Title level="h2">Parameters</Title>
                
                
            </Block>

            <div className="layout-form">
                <div key="no-params" className="row scale-4">
                    <div className="text">Component has no parameters</div>
                    <div className="stretch" />
                    <Button icon="plus" label="Add" />
                </div>
            </div>
        </>
    )
}