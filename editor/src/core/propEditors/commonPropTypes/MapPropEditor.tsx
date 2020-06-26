import * as React from "react";

import { PropEditorRenderProps } from "../../doc/docModels";
import { MapDataType } from "../../doc/dataTypes/models";
import { PropEditor } from "../PropEditor";
import { PropFolder } from "../PropFolder";

 
const isEmpty = (a: any) => {

    if (a) {
        for (const k in a) {
            if (a[k] !== undefined) return false;
        }
    }

    return true;
}

export const MapPropEditor:React.SFC<PropEditorRenderProps> = (props) => {

    const value = props.value || {}
    const defaultValue = props.defaultValue || {}
    
    const mapType = props.propType as MapDataType;

    const handlePropChange = React.useCallback((propName: string, propValue: any) => {
        const newValue = { ...value, [propName]: propValue }
        props.onChange(props.propName, isEmpty(newValue) ? undefined : newValue);
    }, [value]);

    

    return (
        <PropFolder 
            assigned={!isEmpty(value)}
            name={props.propName} 
            indent
            renderSummary={({ }) => (<div />)}>
            
            {Object.keys(mapType.properties).map(propName => {
                const desc = mapType.properties[propName]
                
                return (
                    <PropEditor {...props} 
                        key={propName} 
                        path={[...props.path, propName ]}
                        propType={desc} 
                        propName={propName}
                        value={value[propName]} 
                        defaultValue={ defaultValue[propName] }
                        onChange={handlePropChange} />
                )
            })}
            
        </PropFolder>
    )
}