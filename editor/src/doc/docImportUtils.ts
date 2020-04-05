import { DocFormat } from "./docFormat";
import { DocState } from "./docState";
import { ComponentState } from "./docState";



export const importDocState = (doc: DocFormat):DocState => {

    let byName:{[k:string]: ComponentState } = { }

    for (const name in doc.components) {
        const c = doc.components[name];
        byName[name] = {
            propTypes: {
                all: Object.keys(c.propTypes),
                byName: c.propTypes
            },
            defaultProps: c.defaultProps,
            rootElement: c.rootElement,
            elements: {
                all: Object.keys(c.elements),    
                byName: c.elements
            }
        }
    }

    return {
        imports: doc.imports,
        components: {
            all: Object.keys(doc.components),
            byName
        }
    }
}