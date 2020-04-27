import * as React from "react";

interface Props {
    text: string
}

export const Text = React.forwardRef(
    (props: Props, ref) => {

        return (
            <span ref={ref as any} style={{ display: "inline" }}>
                {props.text}
            </span>
        )
    })