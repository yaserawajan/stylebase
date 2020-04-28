export type BoxLength = string;

export interface BoxColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface BoxFill {
    color: BoxColor;
    url: string;
}

export interface BoxBorderStyle {
    width: BoxLength;
    style: "solid" | "dotted" | "dashed" | "none";
    color: BoxColor;
}

export interface EdgeProp<T> {
    top: T;
    right: T;
    bottom: T;
    left: T;
}

export type BoxBorder = EdgeProp<BoxBorderStyle>;

export type BoxPadding = EdgeProp<BoxLength>;

export type BoxMargin = EdgeProp<BoxLength>;

export interface BoxStyleProps {
    fill: Partial<BoxFill>;
    border: Partial<BoxBorder>;
    padding: Partial<BoxPadding>;
}

export interface TextProps {
    text: string;
    color: BoxColor;
}
