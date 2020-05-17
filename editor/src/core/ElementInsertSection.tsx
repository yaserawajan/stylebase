import * as React from "react";

import { SearchField } from "../uiShell/controls/SearchField";
import { ComponentUri, DocState, DocSelection } from "./doc/docModels";
import { ComponentCard } from "./ComponentCard";
import { Title } from "../uiShell/controls/Title";
import { ScrollArea } from "../uiShell/controls/ScrollArea";
import { Block } from "../uiShell/Block";
import { Col, Fluid } from "../uiShell/layouts";
import { useSelector, shallowEqual } from "react-redux";
import { selectDocLibState } from "./doc/docLibSelectors";
import { selectEditorState } from "../patterns/docEditor/docEditorSelectors";

interface Props {
    
}

const defaultRenderer = (componentUri: ComponentUri) => <div />;

export const ElementInsertSection:React.SFC<Props> = (props) => {
    const { libs, editorExtensions, components } = useSelector((s:any) => {
        const present = selectEditorState<DocState, DocSelection>(s).present;
        const libState = selectDocLibState(s);
        return { 
            ...libState, 
            components: present.data.components, 
            selectedComponent: present.selection.component 
        };
    }, shallowEqual);

    const [value, setValue] = React.useState("");

    return (
        <>
            
            <Block key="t" scale={2} palette="light-grey-3">
                <Title level="h2">Assets</Title>
            </Block>
            
            <Block key="search" scale={3} palette="light-grey-4">
                <SearchField 
                    className="stretch"
                    value={value} 
                    onChange={setValue} 
                    placeholder="Filter ..." />
            </Block> 

            <ScrollArea key="body" className="stretch bg-dotted">
                <Col key="libs">
                    {Object.keys(libs.byName).map(libName => {
                        const lib = libs.byName[libName];
                        const editorExt = editorExtensions.byName[libName];
                        return (
                            <Col key={libName}>
                                <Block scale={4} palette="light-grey-4" indent={[0, 2]}>
                                    <Title level="h2">{libName}</Title>
                                </Block>
                                <Block indent={[1, 2]} scale={4} palette="light-grey-5" className="bg-dotted">
                                    <Fluid>
                                        {Object.keys(lib.components).map(compName => {
                                            const uri = { lib: libName, component: compName };
                                            const component = (editorExt? editorExt.componentCards[compName]: undefined) || defaultRenderer;
                                            return (
                                                <ComponentCard 
                                                    key={compName} 
                                                    className="occupy-half"
                                                    defaultProps={{}}
                                                    componentUri={uri}
                                                    renderComponent={component}>
                                                        {component(uri)}
                                                </ComponentCard>
                                            );
                                        })}
                                    </Fluid>
                                </Block>
                            </Col>
                        );
                    })}
                </Col>
                
                <Col key="project">
                    <Block scale={4} palette="light-grey-4" indent={[0, 2]}>
                        <Title level="h2">From Project</Title>
                    </Block>
                    {components.all.map(c => {

                        



                    })}
                </Col>
            </ScrollArea>
            
        </>
    );
}