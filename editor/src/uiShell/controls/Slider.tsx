import * as React from "react";

interface Props {
    style?: React.CSSProperties
    className?: string
    value: string
    onChange: (value:string) => void
    min: number
    max: number
    step: number
}

