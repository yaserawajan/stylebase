import * as React from "react";
import { ModalForm } from "../ModalForm";
import { Fluid } from "../../uiShell/layouts";
import { FormField } from "../../uiShell/controls/FormField";
import { InputArea } from "../../uiShell/controls/InputArea";
import { PropMetadata } from "../doc/dataTypes/models";
import { DropDownList } from "../../uiShell/controls/dropDownList/DropDownList";
import { selectDataTypes } from "../doc/docStateSelectors";
import { useSelector } from "react-redux";
import { DropDownListItem } from "../../uiShell/controls/dropDownList/DropDownListItem";
import { Block } from "../../uiShell/Block";
import { Title } from "../../uiShell/controls/Title";
import { SchemaEditor } from "../schemaEditor/SchemaEditor";

interface Props {
    name: string
    initValue: PropMetadata
    
    onCancel: () => void
    onSubmit: (value: PropMetadata) => void
}

interface State {
    //type: string
    form: PropMetadata
    errors: any
}


export const ComponentParamTypeEditor:React.SFC<Props> = (props) => {

    const [state, setState] = React.useState<State>({ form: props.initValue, errors: null });
    
    const setModel = (form: PropMetadata) => {
        
        setState(s => ({ ...s, form }));
    }

    const handleSubmit = () => {
        props.onSubmit(state.form);
    }

    return (
        <ModalForm canSubmit title={`Parameter: ${props.name}`} onCancel={props.onCancel} onSubmit={handleSubmit}>
            
            <SchemaEditor 
                className="stretch" 
                value={state.form} 
                onChange={setModel} />

        </ModalForm>
    );
}