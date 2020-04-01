import * as React from "react";
import "./SectionLine.css";


interface Props {
    
}

export const SectionLine:React.SFC<Props> = (props) => {

    return (
        <div className="section-line">
                {props.children}
        </div>
    );

}