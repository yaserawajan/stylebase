import * as React from "react";
import { Title } from "./uiShell/controls/Title";

interface Props {

}

export const ElementListSection:React.SFC<Props> = (props) => {

    return (
        <div className="l3 row">
            <Title>Element(s)</Title>
            
        </div>
    );
}