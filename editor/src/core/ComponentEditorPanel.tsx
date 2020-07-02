import * as React from "react";
import { Panel } from "../uiShell/controls/Panel";
import { useActivePanelState } from "./uiState/ideState";
import { ComponentViewEditorSection } from "./ComponentViewEditorSection";
import { PropEditorFactory } from "./doc/docModels";
import { MenuItem } from "../uiShell/controls/MenuItem";
import { Title } from "../uiShell/controls/Title";
import { ElementListSection } from "./ElementListSection";
import { ElementInsertSection } from "./ElementInsertSection";
import { COMPONENT_EDITOR_TAB_KEY, componentEditorTabs } from "./constants";
import { Block } from "../uiShell/Block";
import { Stretcher } from "../uiShell/controls";



interface Props {
    component: string
    className?: string
    style: React.CSSProperties
    propEditorFactory: PropEditorFactory
}

export const ComponentEditorPanel:React.SFC<Props> = (props) => {

    const [componentEditMode, setComponentEditMode] = useActivePanelState(COMPONENT_EDITOR_TAB_KEY, false);
    
    const editModeSetter = (value: string) => 
        () => {
            setComponentEditMode(value);
        }

    return (
        <Panel style={props.style} appearFrom="right">

            <Block key="title" palette="dark-grey-3" scale={1}>

                <Title icon="microchip" level="h1">{props.component}</Title>

            </Block>

            <Block key="menu" scale={2} palette="dark-grey-4">

                <MenuItem 
                    key={componentEditorTabs.add}
                    selected={componentEditMode == componentEditorTabs.add}
                    onClick={editModeSetter(componentEditorTabs.add)} label="Add" icon="plus" />
                
                <MenuItem 
                    key={componentEditorTabs.adjust} 
                    selected={componentEditMode == componentEditorTabs.adjust}
                    onClick={editModeSetter(componentEditorTabs.adjust)} label="Adjust" icon="edit" />
                
                <MenuItem 
                    key={componentEditorTabs.elements}
                    onClick={editModeSetter(componentEditorTabs.elements)}
                    selected={componentEditMode == componentEditorTabs.elements} label="Elements" icon="sitemap" />

                <Stretcher />

            </Block>
            
            {(componentEditMode == componentEditorTabs.add) && <ElementInsertSection />}

            {(componentEditMode == componentEditorTabs.adjust) && <ComponentViewEditorSection propEditorFactory={props.propEditorFactory} />}
            
            {(componentEditMode == componentEditorTabs.elements) && <ElementListSection />}

            
            
 
        </Panel>
    );
}