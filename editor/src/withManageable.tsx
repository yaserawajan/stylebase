import * as React from "react";
import { ComponentUri, ComponentMetadata, PropMap } from "./models";
import ctx from "./context";

export interface ManageableOptions {
    metadata: ComponentMetadata
}

export type ManageableProps = {
    uri: ComponentUri
}

export const withManageable = <TProps extends { children?: any }>(options: ManageableOptions) =>

    (Decoratee: React.ComponentType<TProps>) => {

        return (props: TProps & ManageableProps) => {
            const [state, setState] = React.useState<PropMap>({});
            const c = React.useContext(ctx);
            React.useEffect(() => {
                return c.propSource.subscribe(props.uri, (propsReceived) => {

                    setState(propsReceived);
                    
                });
            }, []);

            const { uri, ...rest } = props as any;
            return (<Decoratee {...state as any} {...props} />);

        };

    }