export interface BoxColor {
    r: number,
    g: number,
    b: number
}

export interface BoxFill {
    color: BoxColor
    url: string
}

export interface BoxBorderStyle {
    width: number
    style: "solid" | "dotted" | "dashed" | "none"

}

export interface BoxBorder {
    top: BoxBorderStyle
    right: BoxBorderStyle
    bottom: BoxBorderStyle
    left: BoxBorderStyle
}

export interface BoxStyleProps {
    fill: Partial<BoxFill>
    border: Partial<BoxBorder> 
}

export const splitProps = <T extends { }>(combined: Partial<BoxStyleProps> & T):[BoxStyleProps, T] => {

    const { fill, border, ...rest } = combined;

    return [{ fill, border }, rest as any];
}





export const createStyle = (styleProps: Partial<BoxStyleProps>):React.CSSProperties => {

    return { }
}