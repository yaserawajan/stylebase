import * as React from "react";

import { Title } from "../../uiShell/controls/Title";
import { ComponentsParamsEditor } from "./ComponentParamsEditor";
import { ComponentNameSection } from "./ComponentNameSection";
import { Block } from "../../uiShell/Block";

interface Props {
    componentName: string
} 

export const ComponentMetadataSection:React.SFC<Props> = (props) => {

    return (
        <>
            <Block scale={2} palette="light-grey-3">
            
                <Title level="h2">General</Title>
                
            </Block>

            <ComponentNameSection value={props.componentName} />

            <ComponentsParamsEditor value={{}} />
        </>
    );
}