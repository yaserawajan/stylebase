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
    }
}


export const boxLibManifest:ComponentLibManifest = {
    components: { 
        Box: {
            definition: Box,
            propTypes: boxProps,
            defaultProps: { }
        }  
    }
} 