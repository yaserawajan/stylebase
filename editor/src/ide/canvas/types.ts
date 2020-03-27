// export type ElementRect = {
//     top: number
//     left: number
//     width: number
//     height: number
// }

export type ElementRectMap = { [element:string]: DOMRect }

export type RectContext = {
    rectMap: ElementRectMap
    topShift: number
    leftShift: number
}