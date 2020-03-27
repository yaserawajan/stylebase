export type ElementState = {
    typeName: string
    name: string
    props: {
        [name:string]: any
    }
    children: ElementState[]
}