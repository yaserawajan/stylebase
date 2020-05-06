
import * as React from "react";

interface Props {
    formName: string
}

export const PropForm:React.SFC<Props> = (props) => {

    return (
        <div className="prop-form">
            {props.children}
        </div>
    );
}