import { ComponentMetadata } from "./docMetadata";

export type DocFormat = {
    imports: string[]
    components: {
        [name: string]: ComponentMetadata
    }
}

