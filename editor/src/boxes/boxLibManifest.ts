import { Box } from "./box/Box";
import { Text } from "./text/Text";
import { ComponentLibManifest } from "../core/doc/docLibModels";
import { boxPropDefaults } from "./box/propDefaults";
import { textPropDefaults } from "./text/propDefaults";
import { boxPropTypes } from "./box/propTypes";
import { textPropTypes } from "./text/propTypes";
import { LIB_NAME } from "./constants";

export const boxLibManifest:ComponentLibManifest = {

    components: { 

        Box: {
            definition: Box,
            propTypes: boxPropTypes,
            defaultProps: boxPropDefaults
        },

        Text: {
            definition: Text,
            propTypes: textPropTypes,
            defaultProps: textPropDefaults
        }  
    },

    types: {

        opacity: {
            type: "number",
            min: 0,
            max: 1,
            step: 0.05, 
            precision: 2
        },

        rgbComponent: {
            type: "number",
            min: 0,
            max: 255,
            step: 1,
            precision: 0
        },

        color: {
            type: "map",
            properties: {
                r: { type: "rgbComponent", lib: LIB_NAME },
                g: { type: "rgbComponent", lib: LIB_NAME },
                b: { type: "rgbComponent", lib: LIB_NAME },
                a: { type: "opacity", lib: LIB_NAME }
            }
        },

        length: {
            type: "text"

        },

        borderStyle: {
            type: "entityRef",
            inlineData: [ "solid", "dotted", "dashed", "none" ]
        },

        borderEdge: {
            type: "map",
            properties: {
                width: { type: "length", lib: LIB_NAME },
                style: { type: "borderStyle", lib: LIB_NAME },
                color: { type: "color", lib: LIB_NAME }
            }
        },

        border: {
            type: "map",
            properties: {
                top: { type: "borderEdge", lib: LIB_NAME },
                right: { type: "borderEdge", lib: LIB_NAME },
                bottom: { type: "borderEdge", lib: LIB_NAME },
                left: { type: "borderEdge", lib: LIB_NAME }
            }
        },

        padding: {
            type: "map",
            properties: {
                top: { type: "length", lib: LIB_NAME },
                right: { type: "length", lib: LIB_NAME },
                bottom: { type: "length", lib: LIB_NAME },
                left: { type: "length", lib: LIB_NAME }
            }
        },

        font: {
            type: "map",
            properties: {
                family: { type: "text" },
                italic: { type: "boolean"},
                letterSpacing: { type: "number" },
                provider: { type: "text" },
                size: { type: "number" },
                smallCaps: { type: "boolean"},
                weight: {
                    type: "number",
                    min: 100,
                    max: 900,
                    step: 100,
                    stepExclusive: true,
                    precision: 0
                }
            }
            
        }


    }
} 