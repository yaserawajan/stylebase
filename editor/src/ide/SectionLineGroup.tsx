import * as React from "react";
import "./SectionLineGroup.css";

interface Props {
    title: string
}

export const SectionLineGroup:React.SFC<Props> = (props) => {

    return (

        <div className="section-line-group">
            <div className="section-line-group__title">
                {props.title}
            </div>
            <div className="section-line-group__children">
                {props.children}
            </div>
        </div>

    );

}