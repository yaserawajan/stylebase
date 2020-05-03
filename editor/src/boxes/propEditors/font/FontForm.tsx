import "./font_form.less";

import * as React from "react";
import { BoxFont } from "../../types";
import { FormField } from "../../../core/propEditors/FormField";
import { NumberInput } from "../../../core/propEditors/NumberInput";
import { InputBar } from "../../../core/propEditors/InputBar";
import { InputIcon } from "../../../core/propEditors/InputIcon";
import { FontFamilySelector } from "./FontFamilySelector";

interface Props {
    value: BoxFont
    onChange: (value: BoxFont) => void
}

export const FontForm:React.FC<Props> = (props) => {

    const changeHandler = React.useCallback((propName: string) => 
        (value: any) => { 
            props.onChange({
                ...props.value,
                [propName]: value
            })
        }, [props.value]);

    return (
        <div className="font-form">
            <div className="row">

                <FormField key="size" name="size" className="stretch">
                    <InputBar>
                        <NumberInput
                            onChange={changeHandler("size")}
                            value={props.value.size}
                            precision={0} />
                    </InputBar>
                </FormField>

                <FormField key="spacing" name="spacing" className="stretch">
                    <InputBar>
                        <NumberInput
                            onChange={changeHandler("letterSpacing")}
                            value={props.value.letterSpacing}
                            precision={3} />
                    </InputBar>
                </FormField>

            </div>

            <div className="row">

                <FormField key="weight" name="weight / style" className="stretch">
                    <InputBar>
                        <div className="row">
                            <NumberInput
                                className="stretch"
                                onChange={changeHandler("weight")}
                                value={props.value.weight}
                                precision={0}
                                min={100}
                                max={900}
                                step={100}
                                stepExclusive />
                            <InputIcon icon="italic" />
                        </div>
                    </InputBar>
                </FormField>

                
            </div>

            <FormField key="family" name="family" className="row">
                <FontFamilySelector value={props.value.family} onChange={changeHandler("family")} />
            </FormField>
            
        </div>
    )
}