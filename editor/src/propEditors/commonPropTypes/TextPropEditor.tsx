import * as React from "react";

import { PropEditorRenderProps } from "../../doc/docModels";
import { InputGroup } from "../InputGroup";
import { SimpleProp } from "../SimpleProp";
import { Input } from "../Input";

interface Props extends PropEditorRenderProps {
    
}

export const TextPropEditor:React.SFC<Props> = (props) => {

    const handleChange = (newValue: string) => {
        props.onChange(props.propName, newValue || undefined)
    }

    return (
        <SimpleProp name={props.propName} key={props.propName} assigned={!!props.value}>
            <InputGroup>
                <Input value={props.value} onChange={handleChange} />
            </InputGroup>
        </SimpleProp>
    );
}