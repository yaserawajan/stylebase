import * as React from "react";
import { setElementId, elementIdFromJsx, elementIdFromDom, ElementId } from "./viewElementIdentification";
import { useDrop, XYCoord } from "react-dnd";

const useCombinedRefs = (...refs: any[]) => {
    const targetRef = React.useRef();
    React.useEffect(() => {
        refs.forEach(ref => {
            if (!ref) return;
            if (typeof ref === 'function') ref(targetRef.current)
            else ref.current = targetRef.current;
        })
    }, [refs])
    return targetRef;
}

const noChildren:any[] = [];

interface Props {
    idProps: string[]
    contents: JSX.Element
    onDragHover: (elementId: ElementId, item: any, pos: XYCoord) => void
    onDragDrop: (elementId: ElementId, item: any, pos: XYCoord) => void
}

export const DocumentViewElement:React.SFC<Props> = ({ idProps, contents, onDragDrop, onDragHover }) => {

    const ref = React.useRef(null);

    const elementId = elementIdFromJsx(contents, idProps);

    const [, drop] = useDrop({
        accept: ["ELEMENT_ADD"],

        hover: (item, monitor) => {
            if (!monitor.isOver({ shallow: true })) return;

            onDragHover(elementId, item, monitor.getClientOffset());

            //onDragHover(elementIdFromDom())
        },
        drop: (item, monitor) => {
            if (!monitor.isOver({ shallow: true })) return;
            
            
        }
    });

    const combinedRef = useCombinedRefs(contents.props.ref, ref, drop);
    
    React.useEffect(() => {
        setElementId(ref.current, elementId);
    }, [contents]);

    

    const children = contents.props.children
        ? React.Children.toArray(contents.props.children)
        : noChildren;

    return React.cloneElement(contents, {

        ref: combinedRef

    }, children.map((child:any) => child.props
            ? <DocumentViewElement
                    onDragDrop={onDragDrop}
                    onDragHover={onDragHover} 
                    idProps={idProps} 
                    contents={child as any} />
            : child));
}