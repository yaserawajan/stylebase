import * as React from "react";
import { ComponentLibEditorManifest } from "../doc/docLibModels";
import { Box } from "./box/Box";
import { Text } from "./Text";
import { ColorPropEditor } from "./propEditors/color/ColorPropEditor";

const propEditors:{[k:string]: React.ComponentType<any>} = {
    color: ColorPropEditor,
    
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

        if (lib === "boxes") {

            const C = propEditors[type];

            if (C) return <C {...renderProps} />
        }

        return null;
    }
} 