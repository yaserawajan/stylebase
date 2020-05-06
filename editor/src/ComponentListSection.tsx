import * as React from "react";

interface Props {

}

export const ComponentListSection:React.SFC<Props> = (props) => {

    return (
        <div className="scale-3 palette-3 dark row">
            <div className="text"><strong>Component List</strong></div>
        </div> 
    );
}