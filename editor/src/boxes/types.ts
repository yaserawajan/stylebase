export type BoxLength = string;

export interface BoxColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface BoxFill {
    color: BoxColor
    url: string
}

export interface BoxBorderStyle {
    width: BoxLength
    style: "solid" | "dotted" | "dashed" | "none"
    color: BoxColor
}

export interface EdgeProp<T> {
    top: T
    right: T
    bottom: T
    left: T
}

export type BoxBorder = EdgeProp<BoxBorderStyle>;

export type BoxPadding = EdgeProp<BoxLength>;

export type BoxMargin = EdgeProp<BoxLength>;

export interface BoxStyleProps {
    fill: Partial<BoxFill>
    border: Partial<BoxBorder>
    padding: Partial<BoxPadding>
}

export interface TextProps {
    text: string
    color: BoxColor
    font: BoxFont
}

export type FontFamily = {
    name: string
    provider: string
}

export type WebFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type WebFontVariant = {
    weight: WebFontWeight
    italic: boolean
}

export type WebFontDesc = {
    family: FontFamily
    variants: WebFontVariant[]
}

export type FontCatalogApi = () => Promise<WebFontDesc[]>

export type FontDownloadApi = (fonts: WebFontDesc[], text?: string) => Promise<{}>

export type FontProvider = {
    getCatalog: FontCatalogApi
    download: FontDownloadApi
}

export type BoxFont = {
    family: FontFamily
    size: number
    smallCaps: boolean
    italic: boolean
    weight: WebFontWeight
    letterSpacing: number
}

