import * as React from "react";
import { ComponentLibManifest, ComponentUri } from "./docMetadata";
import { withPropsEditorMerger } from "./withEditorPropsMerger";
import { DocEditorState } from "../docEditor/docEditorState";
import { DocState, DocSelection, ComponentState } from "./docState";
import { useDocEditorState, selectDocState } from "../docEditor/docEditorSelectors";

export type DocLibCollection = {[k:string]:ComponentLibManifest}

const selectFromState = (s:DocEditorState<DocState,DocSelection>) => {
    const selection = s.present.selection;
    const c = s.preview.components.byName[selection.component];
    
    return { 
        elementSet: c? c.elements.all: [],
        component: c
    };
}

const createComponentType = (libs: DocLibCollection, uri: ComponentUri) => {
    const lib = libs[uri.lib];
    if (!lib) return null;
    const type = lib.componentTypes[uri.component];
    if (!type) return null;
    return withPropsEditorMerger()(type);
}

const createJsxTree = (libs: DocLibCollection, component: ComponentState, elementId: string):JSX.Element => {
 
    const el = component.elements.byName[elementId];
    if (!el) return null;

    const C = createComponentType(libs, el.type);
    if (!C) return null;

    const { children } = el.props;
    if (!children || children.length < 1) return <C key={elementId} editorId={elementId} />;
    else return (
        <C key={elementId} editorId={elementId}>
            {children.map((childId:string) => createJsxTree(libs, component, childId))}
        </C>
    );
}





export const useDocJsxCompiler = (libs: DocLibCollection):JSX.Element => {
    const { component } = useDocEditorState(selectFromState, 
        (r1, r2) => r1.elementSet === r2.elementSet);
    return createJsxTree(libs, component, component.rootElement);
}