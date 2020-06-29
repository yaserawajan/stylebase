import * as React from "react";
import { ComponentFactory, PropsMap } from "./docModels";
import { useDocElementState } from "./docHooks";

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

interface NamedElementProps {
    elementId: string
}

const NamedElement = React.forwardRef<any,NamedElementProps>((props, ref) => {
    const { component, componentFactory } = React.useContext(inlineComponentContext);
    const element = useDocElementState(component, props.elementId);
    const { children = [], ...otherProps } = element.props;
    const C = componentFactory(element.type) as any;
    return <C {...otherProps} 
                ref={ref} 
                children={children.map((child:string) => (
                    <NamedElement key={child} elementId={child} />
                ))} />
});

export const createInlineComponent = (componentFactory: ComponentFactory, component: string, rootElement: string) => {
    return React.forwardRef<any, PropsMap>((props, ref) => {
        
        return (
            <inlineComponentContext.Provider value={{ params: props, componentFactory, component }}>
                <NamedElement ref={ref} elementId={rootElement} />
            </inlineComponentContext.Provider>
        );
    });
}