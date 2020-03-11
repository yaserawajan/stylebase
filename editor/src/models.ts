export type Department = "design" | "runtime" | "content";

export type PropsObservable = {
    subscribe(uri: string, observer: (props:any) => void): () => void
}

export type ManageableAppContext = {
    propSource: PropsObservable
};

export type ComponentUri = string;

export type DataType = "map" | "array" | "dimension" | "color" | "text" | "number" | DataType[] | { [name:string]: DataType };

export type PropMap = { [k:string]: any }

export type Spec<T> = (inp: T) => boolean;

export type PropsMetadata = {
    [name:string]: DataType
}

export interface ComponentMetadata {

    includes: string[]

    stateTags: {
        [name:string]: Spec<PropMap>
    }

    props: {
        [k in Department]: PropsMetadata
    }
}


