import { PropMapMetadata } from "../../core/doc/dataTypes/models";
import { LIB_NAME } from "../constants";

export const boxPropTypes:PropMapMetadata = {

    fill: {
        type: "map",
        properties: {
            color: { type: "color", lib: LIB_NAME }
        }
    },

    border: {
        type: "border",
        lib: LIB_NAME
    },

    padding: {
        type: "padding",
        lib: LIB_NAME
    },

    children: {
        type: "array",
        itemType: {
            type: "elementRef"
        }
    }
}