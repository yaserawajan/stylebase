import * as React from "react";
import { IconLA } from "../IconLA";
import { classes } from "../../utils";



interface Props {
    name: string
    title: string
    subtitle?: string
    isToggled: boolean
    onToggle: (name: string) => void
}

export const Menu:React.SFC<Props> = (props) => {

    const handleClick = () => {
        props.onToggle(props.name);
    }

    return (

        <div className="menu">
            <div className="menu-header" onClick={handleClick}>

                <div className={classes("menu-toggle-icon", props.isToggled? "on": "off")}>
                    <IconLA 
                        icon="angle-right" 
                        size="la-lx"
                        className={classes("rotatable", props.isToggled? "rotate-90-cw" : "rotate-0")} />
                </div>

                <div className="menu-title">
                    <span>{props.title}</span>
                    {props.subtitle && <span className="menu-subtitle">{props.subtitle}</span>}
                </div>
                
            </div>
            {props.isToggled
                ? <div className="menu-body">
                    {props.children}
                </div> 
                : null
            }
        </div>

    );


}