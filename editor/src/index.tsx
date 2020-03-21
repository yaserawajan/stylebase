import * as React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";
import "normalize.css";
import "./style.css";
import { IdeApp } from "./ide/IdeApp";
import { ideReducer } from "./ide/state/ideState";

const store = createStore(ideReducer);




ReactDOM.render(
    <Provider store={store}>
        <IdeApp />
    </Provider>, document.getElementById("root"));