import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";

import { dragBegin, dragEnd } from "./ideState";


export const useDraggableAsset = (item: any) => {
    const dispatch = useDispatch();
    const [{ }, drag] = useDrag({
        item,
        begin: () => {
            dispatch(dragBegin(item))
        },
        end: (_, m) => {
            if (!m.didDrop()) dispatch(dragEnd())
        }
    });

    return drag;
}