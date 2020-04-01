import * as React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";
import "normalize.css";
import "./style.css";

import { ideReducer, IDE } from "./uiState/ideState";
import { createEditorReducer, DOC_EDITOR } from "./core/docEditorState";
import { DocState, DocSelection, DocAction } from "./core/docState";
import { App } from "./App";






const docInit:DocState = {
    title: "My First Collection",
    components: {
        all: [ "NavBar", "TabBar", "FormField" ],
        byName: {
            "NavBar": {
                metadata: {
                    propSchema: { },
                    states: { }
                },

                elements: {
                    all: [ "root" ],
                    byName: {
                        "root": {
                            component: "Box",
                            propValues: {
                                default: {
                                    children: [ ]
                                },
                                profiles: {

                                }
                            }
                        }
                    }
                },

                rootElement: "root"

            },

            // "TabBar": {

            // },

            // "FormField": {

            // },


        }
    }
}

const store = createStore(combineReducers({
    [IDE]: ideReducer,
    [DOC_EDITOR]: createEditorReducer<DocState,DocAction,DocSelection>({
        defaultDoc: () => docInit,
        defaultSelection: (doc) => ({
            component: doc.components.all[0],
            elements: ["root"]
        }),
        updateReducer: (snapshot, action) => {

            return snapshot;
        }
    }) 
})); 
 

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById("root"));