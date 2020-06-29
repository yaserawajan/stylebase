import * as React from "react";

import { selectDocLibState } from "./docLibSelectors";
import { ComponentUri, ComponentFactory } from "./docModels";
import { DocState, DocSelection } from "./state/stateModels";
import { useSelector, shallowEqual } from "react-redux";
import { DocLibState } from "./docLibModels";
import { createInlineComponent } from "./InlineComponent";
import { selectEditorState } from "../../patterns/docEditor/docEditorSelectors";

export const useDocLibState = <TResult>(selector: (docLibState: DocLibState) => TResult, 
    eq?: (r1:TResult,r2:TResult) => boolean) => {
        return useSelector<any, TResult>(s => selector(selectDocLibState(s)), eq);
    }

const ComponentNotFound = (props:any) => React.createElement("div", {});

export const useComponentFactory = ():ComponentFactory => {

    const { libs, components } = useSelector((s:any) => {
        const components = selectEditorState<DocState, DocSelection>(s).present.data.components;
        const libs = selectDocLibState(s).libs.byName;
        return { libs, components };
    }, shallowEqual);
    
    return function f(uri:ComponentUri) {
        if (uri.lib) {
            // imported component
            const lib = libs[uri.lib];
            if (!lib) return null;
            const type = lib.components[uri.component].definition;
            return type || ComponentNotFound;
        }
        else {
            // no lib => document component
            const rootElement = components.byName[uri.component].rootElement;
            return createInlineComponent(f, uri.component, rootElement);
        }
    }

}

