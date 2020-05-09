import * as React from "react";

import { Title } from "../../uiShell/controls/Title";
import { ComponentsParamsEditor } from "./ComponentParamsEditor";
import { ComponentNameSection } from "./ComponentNameSection";

interface Props {
    componentName: string
} 

export const ComponentMetadataSection:React.SFC<Props> = (props) => {

    return (
        <>
            <div className="scale-2 palette-3 row-indent-2">
            
                <Title>Metadata</Title>
                
            </div>

            <ComponentNameSection value={props.componentName} />

            <ComponentsParamsEditor value={{}} />
        </>
    );
}