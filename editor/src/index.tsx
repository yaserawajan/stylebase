import "normalize.css";

import * as React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import Html5Backend from "react-dnd-html5-backend";
import { enableBatching } from "redux-batched-actions";

import { createDefaultTemplate, componentWithRoot } from "./boxes/templates/defaultTemplate";
import { boxLibManifest } from "./boxes/boxLibManifest";
import { boxLibEditorManifest } from "./boxes/boxLibEditorManifest";

import { createIdeReducer, IDE } from "./core/uiState/ideState";
import { createEditorReducer } from "./patterns/docEditor/docEditorState";
import { DocState, DocSelection } from "./core/doc/state/stateModels";
import { DocAction } from "./core/doc/state/actionModels";
import { App } from "./core/App";
import { defaultSelector } from "./core/doc/state/docDefaultSelector";
import { createDocUpdateReducer } from "./core/doc/state/stateReducer";
import { DOC_EDITOR } from "./patterns/docEditor/docEditorSelectors";
import { importDocState } from "./core/doc/docImportUtils";
import { DOC_LIB, createDocLibReducer } from "./core/doc/docLibReducer";
import { createPropEditorFactory } from "./core/doc/propEditorUtils";
import { COMPONENT_EDITOR_TAB_KEY, componentEditorTabs } from "./core/constants";

const libs = { "boxes": boxLibManifest };
const editorLibs = { "boxes": boxLibEditorManifest };

const store = createStore(enableBatching(combineReducers({

    [DOC_LIB]: createDocLibReducer(libs, editorLibs),
    
    [IDE]: createIdeReducer({
        "right": "componentEditor",
        [COMPONENT_EDITOR_TAB_KEY]: componentEditorTabs.add,
        
    }),
    
    [DOC_EDITOR]: createEditorReducer<DocState,DocAction,DocSelection>({
        defaultDoc: () => importDocState(createDefaultTemplate()),
        defaultSelection: defaultSelector,
        updateReducer: createDocUpdateReducer(componentWithRoot)
    }) 
}))); 

const propEditorFactory = createPropEditorFactory(libs, [ boxLibEditorManifest ]);

window.onbeforeunload = function() {
    return "Are you sure you want to leave your changes unsaved?";
};

ReactDOM.render(
    <Provider store={store}>
        <DndProvider backend={Html5Backend}>
            <App propEditorFactory={propEditorFactory} />
        </DndProvider>
    </Provider>, document.getElementById("root"));