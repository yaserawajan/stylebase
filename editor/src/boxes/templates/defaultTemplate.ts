import { DocFormat, ComponentMetadata } from "../../core/doc/docModels";
import { LIB_NAME } from "../constants";

export const componentWithRoot:ComponentMetadata = {
    propTypes: { },
    defaultProps: { },
    rootElement: "root",
    elements: {
        "root": {
            type: { component: "Box", lib: LIB_NAME },
            props: {
                children: []
            }
        }
    }
}

const docInit:DocFormat = {
    imports: [LIB_NAME],
    components: {
        "Component1": componentWithRoot, 
    }
}


export const createDefaultTemplate = () => docInit;
