import * as React from "react";

import { PropEditorRenderProps } from "../../../core/doc/docModels";
import { PropForm } from "../../../core/propEditors/PropForm";
import { PropFolder } from "../../../core/propEditors/PropFolder";
import { FontSwatch } from "./FontSwatch";
import { FontForm } from "./FontForm";
import { BoxFont } from "../../types";

export const FontPropEditor:React.FC<PropEditorRenderProps> = ({ children, ...props }) => {

    const handleChange = (value: BoxFont) => {
        props.onChange(props.propName, value);
    }

    const valueWithDefault = {
        ...props.defaultValue, 
        ...props.value
    }

    return (
        <PropFolder 
            renderSummary={() => (<FontSwatch { ...valueWithDefault } />)} 
            assigned={props.value !== undefined} 
            name={props.propName}>

            <PropForm formName={props.path.join('/')}>

                <FontForm value={valueWithDefault} onChange={handleChange} />

            </PropForm>

        </PropFolder>
    );
}