import * as React from "react";
import { SketchPicker as SketchPicker_ } from "react-color";

import { PropEditorRenderProps } from "../../../doc/docModels";
import { SimpleProp } from "../../../propEditors/SimpleProp";
import { ColorSwatch } from "./ColorSwatch";
import { InputBar } from "../../../propEditors/InputBar";
import { PropForm } from "../../../propEditors/PropForm";
import { usePropForm } from "../../../uiState/usePropForm";
import { PropFolder } from "../../../propEditors/PropFolder";
import { NoEmitOnErrorsPlugin } from "webpack";

const SketchPicker = SketchPicker_ as any;

export const ColorPropEditor:React.FC<PropEditorRenderProps> = (props) => {

    const [{}, activateForm, _] = usePropForm(props.propName);

    const handleChange = (color: any) => {
        props.onChange(props.propName, color.rgb);
    }

    return (
        <PropFolder 
            renderSummary={() => (
                
                    <ColorSwatch color={props.value} style={{ 
                        borderRadius: "50%",
                        transform: "scale(0.7)", 
                        width: 30 
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