import * as React from "react";
import ctx from "./context";
import { PropsObservable } from "./models";

export const ManageableApp:React.SFC<{ propSource: PropsObservable }> = ({ propSource, children }) => {

    return (
        <ctx.Provider value={{ propSource }}>
            {children}
        </ctx.Provider>
    );
}

