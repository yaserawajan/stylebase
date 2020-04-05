import * as React from "react";
import { setElementId, elementIdFromJsx } from "./viewElementIdentification";

interface Props {
    idProps: string[]
    contents: JSX.Element
}

export const DocumentViewElement:React.SFC<Props> = ({ idProps, contents }) => {

    const ref = React.useRef<HTMLElement>();
    React.useEffect(() => {
        setElementId(ref.current, elementIdFromJsx(contents, idProps));
    });

    const children = contents.props.children? React.Children.toArray(contents.props.children): [];

    return React.cloneElement(contents, {
        ref: (node: HTMLElement) => {
            // Keep your own reference
            ref.current = node;
            // Call the original ref, if any
            const oldRef = contents.props.ref;
            if (typeof oldRef === 'function') {
                oldRef(node);
            }
        }
    }, children.map((child:any) => child.props
            ? <DocumentViewElement idProps={idProps} contents={child as any} />
            : child));
}