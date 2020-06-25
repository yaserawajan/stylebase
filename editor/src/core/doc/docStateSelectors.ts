
import { selectPreviewState, selectPresentState } from "../../patterns/docEditor/docEditorSelectors";
import { DocState, ElementDesc } from "./docModels";
import { selectDocLibState } from "./docLibSelectors";


const noElement = {}

export const selectDocElement = (component: string, id:string) => 
    (s:any):Partial<ElementDesc & { isPreview: boolean }> => {

        const preview = selectPreviewState<DocState>(s);
        const present = selectPresentState<DocState>(s);
        //const metadata = 

        const c = preview.components.byName[component];
        if (!c) return noElement;
        
        const el = c.elements.byName[id];
        if (el) return {
            ...el,
            isPreview: present.components.byName[component] === undefined
        }

        return noElement;
    }

const builtInDataTypes = ["media", "elementRef", "entityRef", "text", "number", "map", "array", "boolean", "any"]; // ... 
export const selectDataTypes = () =>
    (s:any):string[] => {   
        const doc = selectPresentState<DocState>(s);
        const docLibs = selectDocLibState(s);
        const typeArrays = doc.imports.map(i => Object.keys(docLibs.libs.byName[i].types).map(k => `${i}:${k}`));
        return [].concat.apply(builtInDataTypes, typeArrays);
    }
