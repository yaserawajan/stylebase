import * as React from "react";
import { useDocElementProps } from "./docStateSelectors";

export interface PropMergerOptions {
    
}

type AdditionalProps = {
    editorId: string
}

export const withPropsEditorMerger = 
({  }: PropMergerOptions = undefined) =>
    <TWrappedProps extends React.PropsWithChildren<React.RefAttributes<any>>>(Wrapped: React.ComponentType<TWrappedProps>) =>
        React.forwardRef((props: TWrappedProps & AdditionalProps, ref) => {
            const { editorId, ...rest } = props ;
            const { children, ...otherProps } = useDocElementProps(editorId) as TWrappedProps;
            const W = Wrapped as any;
            return (<W ref={ref} { ...otherProps } { ...rest } />);
        });