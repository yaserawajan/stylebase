import { Box } from "./box/Box";
import { ComponentLibManifest } from "../doc/docLibModels";
import { PropMapMetadata } from "../doc/docModels";
import { cssProps } from "./cssProps";

const boxProps:PropMapMetadata = {
    style: cssProps,
    className: {
        required: false,
        type: "text"
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
    }
} 