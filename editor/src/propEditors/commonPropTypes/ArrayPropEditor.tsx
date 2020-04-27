import * as React from "react";

import { PropEditorRenderProps, ArrayDataType } from "../../doc/docModels";
import { PropEditor } from "../PropEditor";
import { SimpleProp } from "../SimpleProp";
import { InputBarList } from "../InputBarList";
import { InputIcon } from "../InputIcon";

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
        <SimpleProp 
            assigned={props.value && Object.keys(props.value).length > 0}
            name={props.propName}>
            
            <InputBarList>
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
            </InputBarList>
        </SimpleProp>
    )
}