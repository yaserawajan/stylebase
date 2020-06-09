

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIde } from "./ideState";
import { toggled } from "./toggleState";

interface TreeContext {
    toggleExpand: (path:string) => void
    pathBase: string
    expansionMap: { [path:string]: boolean }
}

const treeContext = React.createContext<TreeContext>({ toggleExpand: () => {}, pathBase: null, expansionMap: { } });

interface TreeProps {
    name: string
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

export const useTreeItemState = (props: { name: string }) => {
    const { expansionMap, toggleExpand, pathBase } = React.useContext(treeContext);
    const path = pathBase? "" + pathBase + "." + props.name : props.name;
    const cChild:TreeContext = {
            expansionMap,
            toggleExpand,
            pathBase: path
        }

    return {
            expanded: !!(expansionMap[path]),
            toggleExpand: () => toggleExpand(path), 
            renderChildren: (children?: React.ReactNode):React.ReactNode => (
                <treeContext.Provider key={props.name} value={cChild}>
                    {children}
                </treeContext.Provider>
            )
        }
}
