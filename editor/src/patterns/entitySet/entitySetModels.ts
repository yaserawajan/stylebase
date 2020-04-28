export type EntitySet<T> = {
    all: string[]
    byName: {
        [name: string]: T
    }
}