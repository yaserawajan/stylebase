import * as React from "react";

import { classes } from "../utils";
import { FolderHandleIcon } from "./FolderHandleIcon";

interface Props {
    toggled?: boolean
    level?: "h1" | "h2" | "normal"
    className?: string
    style?: React.CSSProperties
    onToggle?: () => void
}

export const FolderTitle:React.SFC<Props> = ({ className, style, children, level = "normal", toggled, onToggle }) => {

    return (
        <div style={style} className={classes("folder-caption", level, className)}>
            <input type="checkbox" tabIndex={0} checked={toggled} onChange={onToggle} />
            <div key="k1" className="icon"><FolderHandleIcon toggled={toggled} /></div>
            <div key="k2" className="text"><span>{children}</span></div>
            <div key="k3" className="marker" />
        </div>
    );
}