
import * as React from "react";
import { BoxFont } from "../../types";
import { FormField } from "../../../uiShell/controls/FormField";
import { NumberInput } from "../../../uiShell/controls/NumberInput";
import { InputArea } from "../../../uiShell/controls/InputArea";
import { InputIcon } from "../../../uiShell/controls/InputIcon";
import { FontFamilySelector } from "./FontFamilySelector";
import { Block } from "../../../uiShell/Block";
import { Fluid, Row } from "../../../uiShell/layouts";

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
        <Block>
            <Fluid>
                <FormField key="size" name="size" className="occupy-half">
                    <InputArea>
                        <NumberInput
                            onChange={changeHandler("size")}
                            value={props.value.size}
                            precision={0} />
                    </InputArea>
                </FormField>

                <FormField key="spacing" name="spacing" className="occupy-half">
                    <InputArea>
                        <NumberInput
                            onChange={changeHandler("letterSpacing")}
                            value={props.value.letterSpacing}
                            precision={3} />
                    </InputArea>
                </FormField>

                <FormField key="weight" name="weight / style" className="occupy-all">
                    <InputArea>
                        <Row>
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
                        </Row>
                    </InputArea>
                </FormField>

                <FormField key="family" name="family" className="occupy-all">
                    <FontFamilySelector value={props.value.family} onChange={changeHandler("family")} />
                </FormField>
            </Fluid>
        </Block>
    )
}