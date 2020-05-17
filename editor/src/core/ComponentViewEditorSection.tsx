import * as React from "react";
import { shallowEqual, useDispatch } from "react-redux";

import { SelectedElementField } from "./SelectedElementField";
import { ElementUpdateSection } from "./ElementUpdateSection";
import { useDocEditorState } from "../patterns/docEditor/docEditorHooks";
import { DocEditorState, selectionChanged } from "../patterns/docEditor/docEditorState";
import { DocState, DocSelection, PropEditorFactory } from "./doc/docModels";
import { Title } from "../uiShell/controls/Title";
import { Block } from "../uiShell/Block";
import { Col } from "../uiShell/layouts";
import { Stretcher } from "../uiShell/controls";
import { ScrollArea } from "../uiShell/controls/ScrollArea";

interface Props {
    propEditorFactory: PropEditorFactory
}

export const ComponentViewEditorSection:React.SFC<Props> = (props) => {
    
    const { allElements, elementType, elements, component } = useDocEditorState((s: DocEditorState<DocState, DocSelection>) => {
        const selection = s.present.selection;
        const c = s.preview.components.byName[selection.component];
        return {
            allElements: c.elements.all,
            elementType: selection.elements.length === 1 ? c.elements.byName[selection.elements[0]].type.component : null,
            ...selection
        };

    }, shallowEqual);
    const dispatch = useDispatch();

    const setSelection = (elements:string[]) => {
        dispatch(selectionChanged({ elements }));
    }

    return (
        <>
            <Block palette="light-grey-3">
                <Col>
                    <Block key="b1" scale={2}>
                        <Title level="h2">Properties</Title>
                        <Stretcher />
                        <Title style={{ fontFamily: "monospace" }}>{elementType}</Title>
                    </Block>

                    <Block key="b2" scale={3}>
                        <SelectedElementField
                            key="elements"
                            className="stretch"
                            allElements={allElements}
                            value={elements}
                            onChange={setSelection} />
                    </Block>
                </Col>
            </Block>

            <ScrollArea key="body" className="stretch">
                <ElementUpdateSection 
                    renderPropEditor={props.propEditorFactory} 
                    component={component} 
                    elementIds={elements} />
            </ScrollArea>
        </>
    );
}