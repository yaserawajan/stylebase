import { DocState, DocSelection } from "./docModels";

export const defaultSelector = (doc:DocState):DocSelection => {

    const component = doc.components.all[0];
    const elements = [ doc.components.byName[component].rootElement ];
    return { component, elements }
}

