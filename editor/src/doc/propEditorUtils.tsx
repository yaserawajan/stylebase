import * as React from "react";

import { PropEditorFactory } from "./docModels";
import { MapPropEditor } from "../propEditors/commonPropTypes/MapPropEditor";
import { ArrayPropEditor } from "../propEditors/commonPropTypes/ArrayPropEditor";
import { TextPropEditor } from "../propEditors/commonPropTypes/TextPropEditor";
import { NumberPropEditor } from "../propEditors/commonPropTypes/NumberPropEditor";
import { DocLibCollection, ComponentLibEditorManifest } from "./docLibModels";

const commonTypeEditors:{[k:string]: React.ComponentType<any>} = {
    map: MapPropEditor,
    array: ArrayPropEditor,
    text: TextPropEditor,
    number: NumberPropEditor
}

export const createPropEditorFactory = (libs: DocLibCollection, editorLibs: ComponentLibEditorManifest[]):PropEditorFactory => {

    const fn:PropEditorFactory = (renderProps) => {

        const { propType } = renderProps;

        if (!("lib" in propType)) {

            // built-in type ...

            const C:any = commonTypeEditors[propType.type];

            if (C) return <C {...renderProps} />
        }
        else {

            // additional

            // find editor

            const l = editorLibs.length;
            for (let i = 0; i < l; ++i) {
                const editorLib = editorLibs[i];
                const jsx = editorLib.propEditorFactory(renderProps)
                if (jsx) return jsx;
            }

            // not found, de-compose type

            const lib = libs[propType.lib];
            if (lib) {
                const typeDef = lib.types[propType.type];
                if (typeDef) {

                    // re-evaluate with simpler type
                    return fn({
                        ...renderProps,
                        propType: typeDef
                    });
                }
            }
        }

        return null;
    }

    return fn;
}
    