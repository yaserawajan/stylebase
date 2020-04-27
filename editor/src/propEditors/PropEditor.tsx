
import * as React from "react";

import { PropEditorRenderProps } from "../doc/docModels";

import { NoPropEditor } from "./NoPropEditor";
import { ErrorShield } from "../ErrorShield";

interface Props extends PropEditorRenderProps {
    
}

export const PropEditor:React.SFC<Props> = ({ children, ...props }) => {


    return (
        <ErrorShield> 
            {props.renderPropEditor(props) || <NoPropEditor {...props} />}
        </ErrorShield>
    );
}