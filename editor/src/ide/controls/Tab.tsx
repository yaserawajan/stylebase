import * as React from "react";
import TabSelectorContext from "./TabSelectorContext";
import { IconLA } from "../IconLA";
import { classes } from "../../utils";

interface Props {
    name: string
    label?: string
    icon?: string
}

export const Tab:React.SFC<Props> = (props) => {

    const { selectTab, value } = React.useContext(TabSelectorContext);

    const handleClick = React.useCallback(() => {
        selectTab(value == props.name? "": props.name);
    }, [ value ]);

    return (
        <div className={classes("tab", value == props.name? "selected": null)} onClick={handleClick}>
            <div className="tab-icon"><IconLA icon={props.icon} /></div>
            <div className="tab-text">{props.label}</div>
        </div>
    );
}