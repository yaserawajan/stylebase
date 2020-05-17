import * as React from "react";
import { SketchPicker as SketchPicker_ } from "react-color";

import { PropEditorRenderProps } from "../../../core/doc/docModels";
import { ColorSwatch } from "./ColorSwatch";
import { PropFolder } from "../../../core/propEditors/PropFolder";

const SketchPicker = SketchPicker_ as any;

export const ColorPropEditor:React.FC<PropEditorRenderProps> = (props) => {

    const handleChange = (color: any) => {
        props.onChange(props.propName, color.rgb);
    }

    return (
        <PropFolder 
            renderSummary={() => (
                <ColorSwatch color={props.value} />
            )} 
            assigned={props.value !== undefined} 
            name={props.propName}>

            
                <SketchPicker 
                    styles={{
                        picker: {
                            border: "none",
                            background: "transparent",
                            borderRadius: 0,
                            boxShadow: 'none',
                            width: "100%"
                        } 
                    }} 
                    presetColors={[]}
                    color={props.value} 
                    onChangeComplete={handleChange} />

        </PropFolder>
    );
}