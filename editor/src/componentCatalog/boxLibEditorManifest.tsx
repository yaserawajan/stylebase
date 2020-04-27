import * as React from "react";
import { ComponentLibEditorManifest } from "../doc/docLibModels";
import { Box } from "./box/Box";
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
                    }} />
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