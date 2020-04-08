import * as React from "react";



interface Props {
    icon: string
    style?: React.CSSProperties
    className?: string
    size?: string
    onClick?: (e: React.MouseEvent) => void
}

export const IconLA:React.SFC<Props> = ({ icon, style, className, size, onClick }) => 
    <i style={{ lineHeight: "inherit", ...style}} onClick={onClick} className={`${className} fas ${size || "fa-lg"} fa-${icon}`} />