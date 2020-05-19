import { PropsMap, ComponentFactory } from "./docModels";
import React = require("react");

type InlineComponentContext = {
    params: PropsMap
    componentFactory: ComponentFactory
    component: string
}

export const inlineComponentContext = React.createContext<InlineComponentContext>({ 
    component: null,
    params: { }, 
    componentFactory: () => null 
})