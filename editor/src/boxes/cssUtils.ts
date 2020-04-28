import { BoxColor, BoxLength } from "./types";

const transparent = { r: 0, b: 0, g: 0, a: 1 }

export const toCssColor = ({ r, g, b, a }: BoxColor = transparent) => `rgba(${r},${g},${b},${a})`;

export const toCssLength = (value: BoxLength):string => value;


