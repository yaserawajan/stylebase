import * as React from "react";
import { ComponentLibEditorManifest } from "../core/doc/docLibModels";
import { Box } from "./box/Box";
import { ColorPropEditor } from "./propEditors/color/ColorPropEditor";
import { LIB_NAME } from "./constants";
import { FontPropEditor } from "./propEditors/font/FontPropEditor";

const propEditors:{[k:string]: React.ComponentType<any>} = {
    color: ColorPropEditor,
    font: FontPropEditor
}

export const boxLibEditorManifest:ComponentLibEditorManifest = {

    componentCards: {

        Box: () => <Box style={{
                        border: "2px solid #333",
                        minHeight: 30,
                        width: "100%",
                        backgroundColor: "white"
                    }} />,

        Text: () => <div style={{
                        border: "1px dashed #333",
                        fontFamily: "monospace",
                        fontSize: 20,
                        width: "100%",
                        lineHeight: "30px",
                        textAlign: "center"
                    }}>TEXT</div>
    },

    propEditorFactory: (renderProps) => {
        const { type, lib } = renderProps.propType as any;
        if (lib === LIB_NAME) {
            const C = propEditors[type];
            if (C) return <C {...renderProps} />
        }

        return null;
    }
} 