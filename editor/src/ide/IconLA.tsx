import * as React from "react";



interface Props {
    icon: string
    style?: React.CSSProperties
    className?: string
    size?: string
}

export const IconLA:React.SFC<Props> = ({ icon, style, className, size }) => 
    <i style={style} className={`${className} fas ${size || "fa-lg"} fa-${icon}`}></i>