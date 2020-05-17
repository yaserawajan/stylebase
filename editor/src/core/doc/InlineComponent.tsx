import * as React from "react";
import { useDocEditorState } from "../../patterns/docEditor/docEditorHooks";
import { DocState, ComponentFactory } from "./docModels";
import { DocEditorState } from "../../patterns/docEditor/docEditorState";

interface Props {

}

export const createInlineComponent = (componentFactory: ComponentFactory, component: string) => {

    const NamedElement:React.FC<Props> = (props) => {
        
        const data = useDocEditorState((s:DocEditorState<DocState,any>) => s.present.data.components.byName[component]);
        const rootElement = data.rootElement;


        return <div />
    }

    return NamedElement;
}