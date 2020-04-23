import * as React from "react";
import { TreeItem } from "../Tree";
import { IconLA } from "../uiShell/IconLA";
import { classes } from "../uiShell/utils";

interface Props {
    name: string
    assigned?: boolean 
    renderSummary: (state: { isToggled: boolean }) => JSX.Element
}

export const PropFolder:React.SFC<Props> = (props) => {

    return (
        <TreeItem name={props.name}
            renderItem={({ isExpanded, toggleExpand }) => (
                    <div className={classes("row", "prop-folder-header", props.assigned? "assigned": null)}>
                        <div key="toggler" className="toggler" onClick={toggleExpand}>
                            <IconLA icon={isExpanded()? "minus" : "plus"} />
                        </div>
                        <div key="title" className="title">{props.name}</div>
                        <div key="s1" className="stretch" />
                        <div key="summary" className="summary">{props.renderSummary({ isToggled: isExpanded() })}</div>
                    </div>
                )}>
                <div className="prop-folder-items">
                    {props.children}
                </div>
        </TreeItem>
    );
}