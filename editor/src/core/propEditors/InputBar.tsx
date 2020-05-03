import "./input_bar.less";

import * as React from "react";
import { classes } from "../../uiShell/utils";

type ParentHood = { nested?: boolean }

const parentHood = React.createContext<ParentHood>({ });

interface Props {
    style?: React.CSSProperties
    className?: string
    tabIndex?: number
    onClick?: () => void
}

export const InputBar:React.SFC<Props> = React.forwardRef<any, Props>((props, ref) => {

    const { nested } = React.useContext(parentHood);

    return (
        <div ref={ref} 
            tabIndex={props.tabIndex} 
            className={classes(nested ?  "row" : "input-bar", props.className)} 
            style={props.style} 
            onClick={props.onClick}>

            <parentHood.Provider value={{ nested: true }}>

                {props.children}

            </parentHood.Provider>

        </div>
    );
})

