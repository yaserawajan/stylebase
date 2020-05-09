import * as React from "react";
import { PropMapMetadata } from "../doc/docModels";
import { Title } from "../../uiShell/controls/Title";
import { Button } from "../../uiShell/controls/Button";

interface Props {
    value: PropMapMetadata
    onChange?: (value: PropMapMetadata) => void
}

export const ComponentsParamsEditor:React.SFC<Props> = ({ value, onChange }) => {

    const params = Object.keys(value).map(k => ({ name: k, paramType: value[k] }));

    return (
        <>
            <div key="ptitle" className="row scale-3 palette-4 row-indent-2">
                <Title>Parameters</Title>
                
                
            </div>

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