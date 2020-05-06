
import * as React from "react";
import { BoxFont } from "../../types";
import { FormField } from "../../../uiShell/controls/FormField";
import { NumberInput } from "../../../uiShell/controls/NumberInput";
import { InputArea } from "../../../uiShell/controls/InputArea";
import { InputIcon } from "../../../uiShell/controls/InputIcon";
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
        <div className="column">
            <div className="row">

                <FormField key="size" name="size" className="stretch">
                    <InputArea>
                        <NumberInput
                            onChange={changeHandler("size")}
                            value={props.value.size}
                            precision={0} />
                    </InputArea>
                </FormField>

                <FormField key="spacing" name="spacing" className="stretch">
                    <InputArea>
                        <NumberInput
                            onChange={changeHandler("letterSpacing")}
                            value={props.value.letterSpacing}
                            precision={3} />
                    </InputArea>
                </FormField>

            </div>

            <div className="row">

                <FormField key="weight" name="weight / style" className="stretch">
                    <InputArea>
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
                    </InputArea>
                </FormField>

                
            </div>

            <FormField key="family" name="family">
                <FontFamilySelector value={props.value.family} onChange={changeHandler("family")} />
            </FormField>
            
        </div>
    )
}