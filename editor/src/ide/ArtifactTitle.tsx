import * as React from "react";
import "./ArtifactTitle.css";
import { IconLA } from "./IconLA";
import { classes } from "../utils";


interface Props {
    style?: React.CSSProperties
    className?: string
}

export const ArtifactTitle:React.SFC<Props> = ({ style, className }) => {

    return (

        <div style={style} className={classes(className, "artifact-title")}>
            <div className="back interactive">
                <IconLA icon="arrow-left" />
            </div>
            <div className="title">
                {"FancyDropDown"}
                <div className="subtitle">Component</div>
            </div>
        </div>

    );


}