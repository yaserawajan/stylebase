import { BoxColor, BoxLength, BoxFont } from "./types";

const transparent = { r: 0, b: 0, g: 0, a: 1 }

export const toCssColor = ({ r, g, b, a }: BoxColor = transparent) => `rgba(${r},${g},${b},${a})`;

export const toCssLength = (value: BoxLength):string => value;

export const toCssFont = (value: Omit<BoxFont,"size">):React.CSSProperties => ({

    fontFamily: value.family.name,
    letterSpacing: value.letterSpacing,
    fontWeight: value.weight,
    fontStyle: value.italic ? "italic" : undefined,
    fontVariant: value.smallCaps ? "small-caps" : undefined
})
