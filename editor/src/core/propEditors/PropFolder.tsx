
import * as React from "react";
import { TreeItem } from "../uiState/Tree";
import { classes } from "../../uiShell/utils";
import { humanizeIdentifier } from "./commonPropTypes/utils";
import { Folder } from "../../uiShell/controls/Folder";

interface Props {
    name: string
    assigned?: boolean 
    renderSummary: (state: { isToggled: boolean }) => JSX.Element
    indent?: boolean
}
 
export const PropFolder:React.SFC<Props> = (props) => {

    return (
        <TreeItem 
            name={props.name}
            renderItem={({ isExpanded, toggleExpand }) => (
                <Folder  
                    title={humanizeIdentifier(props.name)} 
                    toggled={isExpanded()}
                    onToggle={toggleExpand}
                    marked={props.assigned}
                    renderSummary={(t) => (props.assigned && props.renderSummary({ isToggled: t }))} />
            )}>

            <div className={classes("column", props.indent && "pdl-5")}>
                <div className={props.indent && "column"}>
                    {props.children}
                </div>
            </div>

        </TreeItem>
    );
}