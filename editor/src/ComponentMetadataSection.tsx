import * as React from "react";
import { Title } from "./uiShell/controls/Title";

interface Props {
    
} 

export const ComponentMetadataSection:React.SFC<Props> = (props) => {

    return (
        <div className="l2 row">
            <Title>Data Specs</Title>
            
        </div>
    );
}