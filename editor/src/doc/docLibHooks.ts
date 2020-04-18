import * as React from "react";

import { selectDocLibState } from "./docLibSelectors";
import { ComponentUri, ComponentFactory } from "./docModels";
import { useSelector } from "react-redux";
import { DocLibState } from "./docLibModels";

export const useDocLibState = <TResult>(selector: (docLibState: DocLibState) => TResult, 
    eq?: (r1:TResult,r2:TResult) => boolean) => {
    return useSelector<any, TResult>(s => selector(selectDocLibState(s)), eq);
}

const ComponentNotFound = (props:any) => React.createElement("div", {});

export const useComponentFactory = ():ComponentFactory => {

    const libs = useDocLibState(libState => libState.libs.byName);
    return React.useCallback((uri:ComponentUri) => {
        const lib = libs[uri.lib];
        if (!lib) return null;
        const type = lib.components[uri.component].definition;
        return type || ComponentNotFound;
    }, [libs]);
}

