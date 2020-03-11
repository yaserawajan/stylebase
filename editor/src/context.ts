import * as React from "react";
import { ManageableAppContext, PropsObservable } from "./models";

const noSource:PropsObservable = {
    subscribe: () => () => {}
}

const ctx = React.createContext<ManageableAppContext>({ propSource: noSource });

export default ctx;