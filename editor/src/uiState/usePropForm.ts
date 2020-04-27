import { PropFormViewSpecs } from "./propFormState"


export type PropFormApi = [PropFormViewSpecs, () => void, () => void]

export const usePropForm = (propName: string):PropFormApi => {

    return [
        {
            zIndex: 1001,
            isActive: false
            
        },
        () => {},
        () => {}
    ]
}