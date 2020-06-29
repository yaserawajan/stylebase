
import { selectPreviewState, selectPresentState } from "../../../patterns/docEditor/docEditorSelectors";
import { ElementDesc } from "../docModels";
import { DocState } from "./stateModels";
import { selectDocLibState } from "../docLibSelectors";
import { builtInDataTypes } from "../dataTypes";


const noElement = {}

export const selectDocElement = (component: string, id:string) => 
    (s:any):Partial<ElementDesc & { isPreview: boolean }> => {

        const preview = selectPreviewState<DocState>(s);
        const present = selectPresentState<DocState>(s);
        
        const c = preview.components.byName[component];
        if (!c) return noElement;
        
        const el = c.elements.byName[id];
        if (el) return {
            ...el,
            isPreview: present.components.byName[component] === undefined
        }

        return noElement;
    }


export const selectDataTypes = () =>
    (s:any):string[] => {   
        const doc = selectPresentState<DocState>(s);
        const docLibs = selectDocLibState(s);
        const typeArrays = doc.imports.map(i => Object.keys(docLibs.libs.byName[i].types).map(k => `${i}:${k}`));
        return [].concat.apply(builtInDataTypes, typeArrays);
    }
