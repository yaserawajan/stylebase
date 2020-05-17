import * as React from "react";
import { Title } from "../uiShell/controls/Title";
import { Block } from "../uiShell/Block";

interface Props {

}

export const ElementListSection:React.SFC<Props> = (props) => {

    return (
        <Block scale={2} palette="light-grey-3">
            <Title level="h2">Elements</Title>
        </Block>
    );
}