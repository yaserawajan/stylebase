import "normalize.css";
import "./style.css";

import * as React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";

import { ideReducer, IDE } from "./uiState/ideState";
import { createEditorReducer } from "./docEditor/docEditorState";
import { DocState, DocSelection, DocAction } from "./doc/docState";
import { App } from "./App";
import { createDefaultTemplate } from "./doc/templates/defaultTemplate";
import { defaultSelector } from "./doc/docDefaultSelector";
import { docUpdateReducer } from "./doc/docUpdateReducer";
import { DOC_EDITOR } from "./docEditor/docEditorSelectors";
import { boxLibManifest } from "./componentCatalog/boxLibManifest";
import { importDocState } from "./doc/docImportUtils";
import { DocLibCollection } from "./doc/docRenderUtils";


const store = createStore(combineReducers({
    [IDE]: ideReducer,
    [DOC_EDITOR]: createEditorReducer<DocState,DocAction,DocSelection>({
        defaultDoc: () => importDocState(createDefaultTemplate()),
        defaultSelection: defaultSelector,
        updateReducer: docUpdateReducer
    }) 
})); 
 

const libs:DocLibCollection = {
    "boxes": boxLibManifest
}

ReactDOM.render(
    <Provider store={store}>
        <App libCollection={libs} />
    </Provider>, document.getElementById("root"));