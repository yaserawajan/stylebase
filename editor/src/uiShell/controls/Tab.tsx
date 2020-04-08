import * as React from "react";
import TabSelectorContext from "./TabSelectorContext";
import { IconLA } from "../IconLA";
import { classes } from "../utils";

interface Props {
    name: string
    className? : string
}
// <Tab key="create" name="create" icon="plus" />
//                     <Tab key="edit" name="edit" icon="edit" />
export const Tab:React.SFC<Props> = (props) => {

    const { selectTab, value } = React.useContext(TabSelectorContext);

    const handleClick = React.useCallback(() => {
        selectTab(props.name);
    }, []);

    return (
        <div className={classes(props.className, "tab", value == props.name? "selected": null)} onClick={handleClick}>
            {props.children}
        </div>
    );
}