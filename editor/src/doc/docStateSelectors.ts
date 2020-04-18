
import { selectPreviewState, selectActiveSelection, selectPresentState } from "../docEditor/docEditorSelectors";
import { DocState, ElementDesc } from "./docModels";


const noElement = {}

export const selectDocElement = (component: string, id:string) => 
    (s:any):Partial<ElementDesc & { isPreview: boolean }> => {

        //const activeComponent = selectActiveSelection<DocSelection>(s).component;
        //if (!activeComponent) return noElement;

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

