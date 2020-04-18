
import { DocFormat } from "../docModels";

const docInit:DocFormat = {
    imports: ["boxes"],
    components: {

        "Component1": {
            propTypes: { },
            defaultProps: { },
            rootElement: "root",
            elements: {
                "root": {
                    type: { component: "Box", lib: "boxes" },
                    props: {
                        style: {
                            backgroundColor: "green",
                            color: "white",
                            padding: 30
                        },
                        children: [ "e1", "e2", "e3" ]
                    }
                },
                "e1": {
                    type: { component: "Box", lib: "boxes" },
                    props: {
                        style: {
                            backgroundColor: "lightgreen",
                            color: "white",
                            padding: 30
                        },
                        children: [ ]
                    }
                },
                "e2": {
                    type: { component: "Box", lib: "boxes" },
                    props: {
                        style: {
                            backgroundColor: "red",
                            color: "white",
                            padding: 30
                        },
                        children: [ ]
                    }
                },
                "e3": {
                    type: { component: "Box", lib: "boxes" },
                    props: {
                        style: {
                            backgroundColor: "blue",
                            color: "white",
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
