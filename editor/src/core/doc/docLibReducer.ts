import { AnyAction } from "redux";

import { DocLibCollection, DocLibState, ComponentLibEditorManifest } from "./docLibModels";

export const DOC_LIB = "docLibs";
 
export const createDocLibReducer = (
    initLibs: DocLibCollection, 
    initLibExtensions: {[k:string]:ComponentLibEditorManifest}) => {

    const initState: DocLibState = {
        libs: {
            all: Object.keys(initLibs),
            byName: initLibs
        },
        editorExtensions: {
            all: Object.keys(initLibExtensions),
            byName: initLibExtensions
        }
    }; 

    return (state: DocLibState = initState, action: AnyAction) => {

        return state;
    }
}