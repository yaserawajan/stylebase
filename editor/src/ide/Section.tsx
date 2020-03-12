import * as React from "react";

interface Props {
    label?: string
}

export const Section:React.SFC<Props> = (props) => {

    return (
        <div className="section">
            {props.children}
        </div>
    );
}