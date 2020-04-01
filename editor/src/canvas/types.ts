
export type ElementRect = {
    display: DOMRect,
    actual: DOMRect 
}

export type ElementRectMap = { 
    [element:string]: ElementRect
}

export type RectContext = {
    rectMap: ElementRectMap
}