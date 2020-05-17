import * as React from "react";
import { classes } from "../utils";
import { IconLA } from "./IconLA";

interface Props {
    style?: React.CSSProperties
    className?: string
    toggled?: boolean
}

export const FolderHandleIcon:React.SFC<Props> = (props) => (

    <IconLA icon="angle-right" className={classes("folder-handle-icon", props.toggled && "toggled")} />

);