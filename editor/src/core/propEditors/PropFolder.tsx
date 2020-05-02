import "./prop_folder.css";

import * as React from "react";
import { TreeItem } from "../uiState/Tree";
import { IconLA } from "../../uiShell/IconLA";
import { classes } from "../../uiShell/utils";
import { humanizeIdentifier } from "./commonPropTypes/utils";

interface Props {
    name: string
    assigned?: boolean 
    renderSummary: (state: { isToggled: boolean }) => JSX.Element
    indent?: boolean
}

export const PropFolder:React.SFC<Props> = (props) => {

    return (
        <TreeItem name={props.name}
            renderItem={({ isExpanded, toggleExpand }) => (
                    <div onClick={toggleExpand} 
                        className={classes(
                            "row", 
                            "prop-folder-header", 
                            props.assigned && "assigned",
                            isExpanded() && "toggled" )}>
                        <div key="toggler" className="prop-toggler">
                            <IconLA size="fa-lx" icon="angle-right" className={classes("rotatable", isExpanded()? "rotate-90-cw" : "rotate-0")} />
                        </div>
                        <div key="title" className="prop-title">{humanizeIdentifier(props.name)}</div>
                        <div key="s1" className="stretch" />
                        {props.assigned && <div key="summary" className="summary">{props.renderSummary({ isToggled: isExpanded() })}</div>}
                    </div>
                )}>
                <div className={classes("prop-folder-items", props.indent && "indent")}>
                    {props.children}
                </div>
        </TreeItem>
    );
}