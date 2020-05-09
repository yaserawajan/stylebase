import * as React from "react";
import { SketchPicker as SketchPicker_ } from "react-color";

import { PropEditorRenderProps } from "../../../core/doc/docModels";
import { ColorSwatch } from "./ColorSwatch";
import { PropForm } from "../../../core/propEditors/PropForm";
import { PropFolder } from "../../../core/propEditors/PropFolder";

const SketchPicker = SketchPicker_ as any;

export const ColorPropEditor:React.FC<PropEditorRenderProps> = (props) => {

    const handleChange = (color: any) => {
        props.onChange(props.propName, color.rgb);
    }

    return (
        <PropFolder 
            renderSummary={() => (
                <ColorSwatch color={props.value} style={{ 
                    borderRadius: "50%",
                    transform: "scale(0.7)", 
                    width: "1em",
                    height: "1em",
                    border: "1px solid white" 
                }} />
            )} 
            assigned={props.value !== undefined} 
            name={props.propName}>

            <PropForm formName={props.path.join(' / ')}>
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
            </PropForm>

        </PropFolder>
    );
}