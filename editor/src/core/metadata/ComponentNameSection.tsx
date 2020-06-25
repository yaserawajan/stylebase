import * as React from "react";
import { FormField } from "../../uiShell/controls/FormField";
import { Title } from "../../uiShell/controls/Title";
import { Button } from "../../uiShell/controls/Button";
import { ComponentNameEditor } from "./ComponentNameEditor";
import { Block } from "../../uiShell/Block";
import { Stretcher } from "../../uiShell/controls";
import { useComponentRename } from "../uiState/useComponentRename";

interface Props {
    component: string
}

export const ComponentNameSection:React.FC<Props> = ({ component: value }) => {

    const { toggled, error, remount, handleCancel, handleEdit, handleSubmit } = useComponentRename(value);

    return (
        <>
            <Block scale={3} palette="light-grey-5" indent={[1, 2]}>
            
                <FormField name="Name">
                    <Title>{value}</Title>
                </FormField>

                <Stretcher />

                <Button icon="pen" label="Change" onClick={handleEdit} />

            </Block>
            
            {toggled && 
                <ComponentNameEditor 
                    error={error}
                    remount={remount}
                    value={value} 
                    onSubmit={handleSubmit}
                    onCancel={handleCancel} />
            }
        </>
    );
}