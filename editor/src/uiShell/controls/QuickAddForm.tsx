import * as React from "react";
import { Fluid } from "../layouts";
import { FormField } from "./FormField";
import { InputArea } from "./InputArea";
import { Input } from "./Input";
import { Button } from "./Button";

interface Props {
    validator?: (name: string) => boolean
    title: string
    onAdd: (name: string) => void
}

const success = (_:string) => true;

export const QuickAddForm:React.FC<Props> = ({
    validator = success,
    onAdd, 
    title
}) => {

    const [name, setName] = React.useState("");

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (name.length < 1 || !validator(name)) return;
        setName("");
        onAdd(name);
    }

    return (
        <Fluid tag={"form" as any} key="__footer" onSubmit={handleSubmit}>
            <FormField name={title} className="stretch">
                <InputArea>
                    <Input value={name} onChange={setName} placeholder="Name ..." />
                </InputArea>
            </FormField>
            <Button 
                type="submit" 
                icon="plus" 
                label="Add" 
                disabled={name.length < 1 || !validator(name)} />
        </Fluid>
    )
}