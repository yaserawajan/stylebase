import * as React from "react";
import { useDispatch } from "react-redux";

import { MenuItem } from "../uiShell/controls/MenuItem";
import { useDocEditorState } from "../patterns/docEditor/docEditorHooks";
import { DocState, ComponentState, DocSelection } from "./doc/docModels";
import { EntitySet } from "../patterns/entitySet/entitySetModels";
import { actionUpdate, selectionChanged } from "../patterns/docEditor/docEditorState";
import { docComponentAdd } from "./doc/docActions";
import { Title } from "../uiShell/controls/Title";
import { ScrollArea } from "../uiShell/controls/ScrollArea";
import { Block } from "../uiShell/Block";
import { Stretcher } from "../uiShell/controls";
import { Button } from "../uiShell/controls/Button";
import { ComponentAddForm } from "./ComponentAddForm";

interface Props {

}

export const ComponentListSection:React.SFC<Props> = (props) => {

    const { doc, selection } = useDocEditorState<DocState,any, { doc: EntitySet<ComponentState>, selection: DocSelection }>(s => ({ 
        doc: s.present.data.components,
        selection: s.present.selection
    }));

    const [ addToggled, toggleAdd ] = React.useState(false);
    const dispatch = useDispatch();

    const handleAdd = () => toggleAdd(true);

    const handleAddCancel = () => toggleAdd(false);

    const handleAddSuccess = () => toggleAdd(false);
    
    const selectionChanger = (component: string) => 
        () => {
            const elements = [ doc.byName[component].rootElement ];
            dispatch(selectionChanged({ component, elements }));
        }

    const list = doc.all
        .map(n => ({ name: n, data: doc.byName[n] || {} }))
        .sort((a, b) => (a.name > b.name) 
            ? 1 
            : (a.name === b.name) 
                ? ((a.name > b.name) ? 1 : -1) : -1 )

    return (
        <>
            <Block key="d1" scale={2} palette="light-grey-3" indent={[0, 1]}>
                <Title level="h2">Components</Title>
                <Stretcher />
                <Button icon="plus" label="Add" onClick={handleAdd} />
            </Block> 
            <ScrollArea className="stretch">
                {list.map(c => (
                    <Block key={c.name} scale={3} palette="light-grey-5" indent={[0, 2]} onClick={selectionChanger(c.name)}>
                        <Title icon="microchip">
                            {c.name !== selection.component? c.name : <strong>{c.name}</strong>}
                        </Title>
                    </Block>
                ))}
            </ScrollArea>
            {addToggled && <ComponentAddForm onCancel={handleAddCancel} onSuccess={handleAddSuccess} />}
        </>
    );
}