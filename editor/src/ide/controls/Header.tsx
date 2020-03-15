import * as React from "react";

interface Props {
    label?: string
}

export const Header:React.SFC<Props> = (props) => {

    return (
        <div className="header">
            {props.children}
        </div>
    );
}