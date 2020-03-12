import * as React from "react";

interface Props {
    
}

export const PanelSection:React.SFC<Props> = (props) => {

    return (
        <div className="panel-section">
            {props.children}
        </div>
    );
}