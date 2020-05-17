
import * as React from "react";
import { useTreeItemState } from "../uiState/Tree";
import { humanizeIdentifier } from "./commonPropTypes/utils";
import { Folder } from "../../uiShell/controls/Folder";
import { Col } from "../../uiShell/layouts";

interface Props {
    name: string
    assigned?: boolean 
    renderSummary: (state: { isToggled: boolean }) => JSX.Element
    indent?: boolean
}
 
export const PropFolder:React.SFC<Props> = ({ name, renderSummary, assigned, children }) => {

    const { expanded, toggleExpand, renderChildren } = useTreeItemState({ name });

    return (
        <Folder  
            title={humanizeIdentifier(name)} 
            toggled={expanded}
            onToggle={toggleExpand}
            marked={assigned}
            renderSummary={(t) => (assigned && renderSummary({ isToggled: t }))}>

            {expanded && <Col>{renderChildren(children)}</Col>}

        </Folder>
    );
} 