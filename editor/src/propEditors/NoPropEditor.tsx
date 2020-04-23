
import * as React from "react";

import { PropEditorRenderProps } from "../doc/docModels";

interface Props extends PropEditorRenderProps {
    
}

export const NoPropEditor:React.SFC<Props> = ({ children, ...props }) => {

    return (
        <div key={props.propName} />
        /*<div className="no-prop-editor">
            No compatible editor was found
            Cannot edit prop <strong>'{props.propName}'</strong>. 
            No compatible editor was found for type <strong>'{props.propType.type}</strong>'
        </div>*/
    )
}