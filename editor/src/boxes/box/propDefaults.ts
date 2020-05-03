import { BoxStyleProps, BoxBorderStyle, BoxColor } from "../types";

const transparent:BoxColor = { r: 0, g: 0, b: 0, a: 0 }

const none:BoxBorderStyle = {
    color: transparent,
    width: "0px",
    style: "none"
}



export const boxPropDefaults:BoxStyleProps = { 

    padding: {
        top: "10px",
        right: "10px",
        bottom: "10px",
        left: "10px"
    },

    border: {
        top: none,
        right: none,
        bottom: none,
        left: none
    },

    fill: {
        color: transparent,
        
    }

}