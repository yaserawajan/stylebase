import "./prop_editors.css";

import * as React from "react";

import { PropEditorRenderProps } from "../doc/docModels";

import { NoPropEditor } from "./NoPropEditor";

interface Props extends PropEditorRenderProps {
    
}

export const PropEditor:React.SFC<Props> = ({ children, ...props }) => {

    return props.renderPropEditor(props) || <NoPropEditor {...props} />
}