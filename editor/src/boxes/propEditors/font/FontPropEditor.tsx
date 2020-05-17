import * as React from "react";

import { PropEditorRenderProps } from "../../../core/doc/docModels";
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

            <FontForm value={valueWithDefault} onChange={handleChange} />

        </PropFolder>
    );
}