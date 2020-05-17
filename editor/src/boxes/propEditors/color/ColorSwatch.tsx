
import * as React from "react";

import { Avatar } from "../../../uiShell/controls";


interface Props {
    color: any
    className?: string
    style?: React.CSSProperties
}

export const ColorSwatch:React.FC<Props> = ({ color, children, className, style }) => {

    return (
        <Avatar className={className} style={style}>

            <div style={{ 
                width: "100%", height: "100%", 
                position: "absolute", 
                backgroundColor: color? `rgba(${color.r},${color.g},${color.b}, ${color.a})` : undefined 
            }}>

                {children}

            </div>
            
        </Avatar>
    );
}