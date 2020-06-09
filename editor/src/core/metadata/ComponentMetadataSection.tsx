import * as React from "react";

import { Title } from "../../uiShell/controls/Title";
import { ComponentsParamsSection } from "./ComponentParamsSection";
import { ComponentNameSection } from "./ComponentNameSection";
import { Block } from "../../uiShell/Block";
import { useSelector, shallowEqual } from "react-redux";
import { selectComponentMetadata } from "../doc/docLibSelectors";

interface Props {
    componentName: string
} 

export const ComponentMetadataSection:React.SFC<Props> = (props) => {
    const {  propTypes } = useSelector(s => selectComponentMetadata(s, { component: props.componentName }), shallowEqual);
    

    return (
        <>
            <Block scale={2} palette="light-grey-3">
            
                <Title level="h2">General</Title>
                
            </Block>

            <ComponentNameSection value={props.componentName} />

            <ComponentsParamsSection value={propTypes} component={props.componentName} />
        </>
    );
}