import * as React from "react";
import { ComponentLibEditorManifest } from "../doc/docLibModels";
import { Box } from "./box/Box";

export const boxLibEditorManifest:ComponentLibEditorManifest = {
    componentCards: {
        Box: () => <Box style={{
                        border: "2px solid #333",
                        minHeight: 30,
                        width: "100%",
                        backgroundColor: "white"
                    }} />
    }
} 