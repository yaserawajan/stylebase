import * as React from "react";
import { RenderContext } from "./docModels";

export const renderContext = React.createContext<RenderContext>({
    params: {}
})