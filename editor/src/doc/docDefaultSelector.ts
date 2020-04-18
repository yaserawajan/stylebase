import { DocState } from "./docModels";

export const defaultSelector = (doc:DocState) => ({
    component: doc.components.all[0],
    elements: ["root"]
})

