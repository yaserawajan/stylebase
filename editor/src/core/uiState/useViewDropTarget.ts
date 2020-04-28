import * as React from "react";
import { useDrop, XYCoord } from "react-dnd";

import { useDispatch, useSelector } from "react-redux";
import { dragEnd, dragHover, selectIde } from "./ideState";

const combineRefs = (...refs:any[]) => (value:any) => {
    refs.forEach(ref => {
        if (!ref) return;
        if (typeof ref === 'function') ref(value)
        else ref.current = value;
    });
}

type DropGeometry = {
    offsetX: number
    offsetY: number
    containerWidth: number
    containerHeight: number
}

export type DropSurfaceContext = {
    ref: React.Ref<any>
    hover: boolean
}

type DropEvent = {
    component: string
    elementId: string
    actionType: string
    item: any
}

interface Props {
    component: string
    elementId: string
    accept: string[]
    actionTypeResolver: (item: any, geometry: DropGeometry) => string
    onDrop: (e: DropEvent) => void
}

export const useViewDropTarget = ({ component, elementId, onDrop, accept, actionTypeResolver }:Props) => {

    const ref = React.useRef<any>(null);

    const dispatch = useDispatch();

    const [, drop] = useDrop({
        accept,
        hover: (item: any, monitor) => {
            if (!monitor.isOver({ shallow: true })) return;

            const { left, top, width, height } = (ref.current as HTMLElement).getBoundingClientRect();
            const { x, y } = monitor.getClientOffset();
            const geometry:DropGeometry = {
                containerWidth: width,
                containerHeight: height,
                offsetX: x - left,
                offsetY: y - top
            }

            const actionType = actionTypeResolver(item, geometry);
            dispatch(dragHover({ component, elementId, actionType }));
        },
        drop: (item: any, monitor) => {
            if (!monitor.isOver({ shallow: true })) return;

            const { left, top, width, height } = (ref.current as HTMLElement).getBoundingClientRect();
            const { x, y } = monitor.getClientOffset();
            const geometry:DropGeometry = {
                containerWidth: width,
                containerHeight: height,
                offsetX: x - left,
                offsetY: y - top
            }

            dispatch(dragEnd());
            const actionType = actionTypeResolver(item, geometry);
            onDrop({ component, elementId, item, actionType });
        }
    }); 

    return combineRefs(ref, drop);
}