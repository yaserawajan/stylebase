import * as React from "react";

import { PropEditorRenderProps, ArrayDataType } from "../../doc/docModels";
import { PropEditor } from "../PropEditor";
import { InputIcon } from "../../../uiShell/controls/InputIcon";
import { FormField } from "../../../uiShell/controls/FormField";
import { InputArea } from "../../../uiShell/controls/InputArea";

interface Props extends PropEditorRenderProps {
    
}

export const ArrayPropEditor:React.SFC<Props> = (props) => {

    const value:any[] = props.value || []

    const arrayType = props.propType as ArrayDataType;

    const handleItemRemove = React.useCallback((changedAt: number) => 
        () => props.onChange(props.propName, 
                value.filter((_, idx) => changedAt !== idx)), [value]);

    const handleItemChange = React.useCallback((index: string, propValue: any) => {
        const changedAt = parseInt(index);
        const total = value.length;
        const newValue = (changedAt === total)
            ? [ ...value, propValue ]
            : value.map((i:any, idx) => changedAt === idx ? propValue : i);
        
        props.onChange(props.propName, (newValue.length === 1 && newValue[0] === undefined)? []: newValue);
    }, [value]);

    const handleItemAdd = React.useCallback(() => {
        props.onChange(props.propName, [
            ...value,
            undefined
        ])
    }, [value]);

    const renderedValue = value.length > 0 ? value : [ undefined ];
    const lastIndex = renderedValue.length - 1;
    return (
        <FormField 
            assigned={props.value && Object.keys(props.value).length > 0}
            name={props.propName}>
            
            <InputArea>
                {renderedValue.map((item, idx) => 
                    <div className="item" key={idx}>
                        <InputIcon 
                            icon="trash" 
                            onClick={handleItemRemove(idx)} 
                            disabled={idx === lastIndex && item === undefined} />
                        
                        <PropEditor {...props} 
                            compact
                            propType={arrayType.itemType} 
                            path={[...props.path, `[${idx}]` ]}
                            propName={idx.toString()}
                            value={item} 
                            onChange={handleItemChange} />

                        {(idx === lastIndex) && 
                            <InputIcon icon="plus" onClick={handleItemAdd} disabled={item === undefined} />}
                    </div>
                )}
            </InputArea>
        </FormField>
    )
}