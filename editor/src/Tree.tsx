

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIde } from "./uiState/ideState";
import { toggled } from "./uiState/toggleState";

interface TreeContext {
    toggleExpand: (path:string) => void
    pathBase: string
    expansionMap: { [path:string]: boolean }
}

const treeContext = React.createContext<TreeContext>({ toggleExpand: () => {}, pathBase: null, expansionMap: { } });


interface TreeProps {
    name: string
}

interface RenderProps {
    isExpanded: () => boolean
    toggleExpand: () => void
}

interface TreeItemProps {
    name: string
    renderItem: (c: RenderProps) => JSX.Element
}

export const Tree:React.SFC<TreeProps> = (props) => {

    const toggleState = useSelector((s:any) => selectIde(s).toggles);
    const dispatch = useDispatch();

    const ctx:TreeContext = {
        pathBase: props.name,
        expansionMap: toggleState,
        toggleExpand: (path:string) => {
            dispatch(toggled(path));
        }
    }

    return <treeContext.Provider value={ctx}>{props.children}</treeContext.Provider>;
}

export const TreeItem:React.SFC<TreeItemProps> = (props) => {

    const { expansionMap, toggleExpand, pathBase } = React.useContext(treeContext);

    const path = pathBase? "" + pathBase + "." + props.name : props.name;

    const cChild:TreeContext = {
            expansionMap,
            toggleExpand,
            pathBase: path
        }

    const renderProps:RenderProps = {
            isExpanded: () => expansionMap[path],
            toggleExpand: () => toggleExpand(path)
        }

    return (
        <>
            {props.renderItem(renderProps)}
            {renderProps.isExpanded() && <treeContext.Provider key={props.name} value={cChild}>
                {props.children}
            </treeContext.Provider>}
        </>
    );
}