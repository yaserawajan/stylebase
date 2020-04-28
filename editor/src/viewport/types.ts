import { ElementId } from "./viewElementIdentification"

export type ElementRect = {
    display: DOMRect,
    actual: DOMRect,
    info: ElementId 
}

export type ElementRectMap = { 
    [element:string]: ElementRect
}


export type RectContext = {
    rectMap: ElementRectMap
}