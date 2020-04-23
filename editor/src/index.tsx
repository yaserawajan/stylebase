import "normalize.css";
import "./style.css";

import * as React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import Html5Backend from "react-dnd-html5-backend";
import { enableBatching } from "redux-batched-actions";

import { createIdeReducer, IDE } from "./uiState/ideState";
import { createEditorReducer } from "./docEditor/docEditorState";
import { DocState, DocSelection, DocAction, PropMetadata, PropEditorRenderProps, PropEditorFactory } from "./doc/docModels";
import { App } from "./App";
import { createDefaultTemplate } from "./doc/templates/defaultTemplate";
import { defaultSelector } from "./doc/docDefaultSelector";
import { docUpdateReducer } from "./doc/docUpdateReducer";
import { DOC_EDITOR } from "./docEditor/docEditorSelectors";
import { boxLibManifest } from "./componentCatalog/boxLibManifest";
import { importDocState } from "./doc/docImportUtils";
import { DOC_LIB, createDocLibReducer } from "./doc/docLibReducer";
import { boxLibEditorManifest } from "./componentCatalog/boxLibEditorManifest";
import { MapPropEditor } from "./propEditors/commonPropTypes/MapPropEditor";
import { TextPropEditor } from "./propEditors/commonPropTypes/TextPropEditor";
import { NumberPropEditor } from "./propEditors/commonPropTypes/NumberPropEditor";


const store = createStore(enableBatching(combineReducers({

    [DOC_LIB]: createDocLibReducer(
        { "boxes": boxLibManifest }, 
        { "boxes": boxLibEditorManifest }),
    
    [IDE]: createIdeReducer({
        "right": "componentEditor",
        "componentEditMode": "design",
        "editMode": "elements"
    }),
    
    [DOC_EDITOR]: createEditorReducer<DocState,DocAction,DocSelection>({
        defaultDoc: () => importDocState(createDefaultTemplate()),
        defaultSelection: defaultSelector,
        updateReducer: docUpdateReducer
    }) 
}))); 
 

const propEditorFactory:PropEditorFactory = (renderProps) => {
    if (renderProps.propType.type == "map") {
        return <MapPropEditor {...renderProps} />;
    }
    else if (renderProps.propType.type == "text") {
        return <TextPropEditor {...renderProps} />;
    }
    else if (renderProps.propType.type == "number") {
        return <NumberPropEditor {...renderProps} />;
    }

    return null;
}

ReactDOM.render(
    <Provider store={store}>
        <DndProvider backend={Html5Backend}>
            <App propEditorFactory={propEditorFactory} />
        </DndProvider>
    </Provider>, document.getElementById("root"));