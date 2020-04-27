import { Box } from "./box/Box";
import { Text } from "./Text";
import { ComponentLibManifest } from "../doc/docLibModels";
import { PropMapMetadata } from "../doc/docModels";
import { cssProps } from "./cssProps";

const boxProps:PropMapMetadata = {

    //style: cssProps,

    // className: {
    //     required: false,
    //     type: "array",
    //     itemType: {
    //         type: "text"
    //     }
    // },
    
    fill: {
        type: "map",
        properties: {
            color: { type: "color", lib: "boxes" }
        }
    },

    border: {
        type: "border",
        lib: "boxes"
    },

    children: {
        type: "array",
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

                fill: {
                    color: { r: 255, g: 255, b: 255, a: 1 },
                    border: {
                        top: {
                            width: 2,
                            style: "solid",
                            color: { r: 33, g: 33, b: 33, a: 1 }
                        },
                        right: {
                            width: 2,
                            style: "solid",
                            color: { r: 33, g: 33, b: 33, a: 1 }
                        },
                        bottom: {
                            width: 2,
                            style: "solid",
                            color: { r: 33, g: 33, b: 33, a: 1 }
                        },
                        left: {
                            width: 2,
                            style: "solid",
                            color: { r: 33, g: 33, b: 33, a: 1 }
                        }
                    }
                }

            }
        },
        Text: {
            definition: Text,
            propTypes: {
                text: {
                    type: "text"
                },
                color: {
                    type: "color",
                    lib: "boxes"
                },
            },
            defaultProps: {
                text: "Add Text ..."
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
        },

        

        length: {
            type: "number"

        },

        borderStyle: {
            type: "entityRef",
            inlineData: [ "solid", "dotted", "dashed" ]
        },

        borderEdge: {
            type: "map",
            properties: {
                width: { type: "length", lib: "boxes" },
                style: { type: "borderStyle", lib: "boxes" },
                color: { type: "color", lib: "boxes" }
            }
        },

        border: {
            type: "map",
            properties: {
                top: { type: "borderEdge", lib: "boxes" },
                right: { type: "borderEdge", lib: "boxes" },
                bottom: { type: "borderEdge", lib: "boxes" },
                left: { type: "borderEdge", lib: "boxes" }
            }
        }


    }
} 