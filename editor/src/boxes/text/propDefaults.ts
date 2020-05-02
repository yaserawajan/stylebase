import { TextProps } from "../types";

const black = {
    r: 0,
    g: 0,
    b: 0,
    a: 1
}

export const textPropDefaults:TextProps = {
    text: "Add Text ...",
    color: black,
    font: {
        family: {
            name: "Arial",
            provider: "system"
        },
        italic: false,
        letterSpacing: 0,
        size: 16,
        smallCaps: false,
        weight: 400
    }
}