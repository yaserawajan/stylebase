import * as React from "react";

interface Props {

}

export const ElementListSection:React.SFC<Props> = (props) => {

    return (
        <div className="scale-3 palette-3 row">
            <div className="text"><strong>Element(s)</strong></div>
            
        </div>
    );
}