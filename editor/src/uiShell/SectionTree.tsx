import * as React from "react";
import "./SectionTree.css";

interface Props {

}

export const SectionTree:React.SFC<Props> = (props) => {

    return (
        <div className="section-tree">
            {props.children}
        </div>
    );
}