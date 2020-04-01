import * as React from "react";
import "./SectionLineGroup.css";

interface Props {
    title: string
}

export const SectionLineGroup:React.SFC<Props> = (props) => {

    return (
        <div className="section-line-group">
            <div className="title">
                {props.title}
            </div>
            <div className="children">
                {props.children}
            </div>
        </div>
    );

}