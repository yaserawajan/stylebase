import * as React from "react";
import { Title } from "../uiShell/controls/Title";

interface Props {

}

export const ElementListSection:React.SFC<Props> = (props) => {

    return (
        <div className="scale-2 palette-3 row-indent-2">
            <Title>Elements</Title>
        </div>
    );
}