import { Box } from "./box/Box";
import { ComponentLibManifest } from "../doc/docLibModels";
import { PropMapMetadata } from "../doc/docModels";
import { cssProps } from "./cssProps";

const boxProps:PropMapMetadata = {

    style: cssProps,

    className: {
        required: false,
        type: "array",
        itemType: {
            type: "text"
        }
    },
    
    children: {
        type: "array",
        required: false,
        itemType: {
            type: "elementRef"
        }
    }
}


export const boxLibManifest:ComponentLibManifest = {
    components: { 
        Box: {
            definition: Box,
            propTypes: boxProps,
            defaultProps: { 
                style: {
                    width: 100,
                    height: 30,
                    backgroundColor: "white"
                }
            }
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
                r: { type: "rgbComponent", lib: "boxes" },
                g: { type: "rgbComponent", lib: "boxes" },
                b: { type: "rgbComponent", lib: "boxes" },
                a: { type: "opacity", lib: "boxes" }
            }
        }
    }
} 