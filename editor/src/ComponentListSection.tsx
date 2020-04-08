import * as React from "react";
import { Title } from "./uiShell/controls/Title";

interface Props {

}

export const ComponentListSection:React.SFC<Props> = (props) => {

    return (
        <div className="l3 row">
            <Title>Component List</Title>
        </div>
    );
}