import * as React from "react";
import { ModalForm } from "../ModalForm";
import { PropMetadata } from "../doc/dataTypes/models";
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