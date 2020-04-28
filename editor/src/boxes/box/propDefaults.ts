import { BoxStyleProps } from "../types";

export const boxPropDefaults:BoxStyleProps = { 

    padding: {
        top: "10px",
        right: "10px",
        bottom: "10px",
        left: "10px"
    },

    border: {
        top: {
            width: "2px",
            style: "solid",
            color: { r: 33, g: 33, b: 33, a: 1 }
        },
        right: {
            width: "2px",
            style: "solid",
            color: { r: 33, g: 33, b: 33, a: 1 }
        },
        bottom: {
            width: "2px",
            style: "solid",
            color: { r: 33, g: 33, b: 33, a: 1 }
        },
        left: {
            width: "2px",
            style: "solid",
            color: { r: 33, g: 33, b: 33, a: 1 }
        }
    },

    fill: {
        color: { r: 255, g: 255, b: 255, a: 1 },
        
    }

}