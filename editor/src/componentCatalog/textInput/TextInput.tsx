import * as React from "react";

export interface TextInputProps {
    placeholder: string
    value?: string
    style?: React.CSSProperties
}

export const TextInput:React.SFC<TextInputProps> = React.forwardRef((props, ref) => {
    
    return (
        <input type="text" ref={ref as any} style={props.style} placeholder={props.placeholder} value={props.value} />
    )
});