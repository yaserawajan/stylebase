
import { DocFormat } from "../../core/doc/docModels";
import { LIB_NAME } from "../constants";

const docInit:DocFormat = {
    imports: [LIB_NAME],
    components: {

        "Component1": {
            propTypes: { },
            defaultProps: { },
            rootElement: "root",
            elements: {
                "root": {
                    type: { component: "Box", lib: LIB_NAME },
                    props: {
                        children: [ "e1", "e2", "e3" ]
                    }
                },
                "e1": {
                    type: { component: "Box", lib: LIB_NAME },
                    props: {
                        style: {
                            
                            padding: 30
                        },
                        children: [ ]
                    }
                },
                "e2": {
                    type: { component: "Box", lib: LIB_NAME },
                    props: {
                        style: {
                            
                            padding: 30
                        },
                        children: [ ]
                    }
                },
                "e3": {
                    type: { component: "Box", lib: LIB_NAME },
                    props: {
                        style: {
                            
                            padding: 30
                        },
                        children: [ ]
                    }
                }
            }
        }, 

    }
}


export const createDefaultTemplate = () => docInit;
