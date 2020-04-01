import { OptionState, OptionChangedAction, optionReducer, optionChanged } from "./optionState";
import { ToggleState, ToggledAction, toggleReducer, toggled } from "./toggleState";
import { useSelector, useDispatch } from "react-redux";
 
export type ZoomChangedAction = {
    type: "ZOOM_CHANGED",
    value: number
}

export type HoverChangedAction = {
    type: "HOVER_CHANGED"
    element?: string
}

export const zoomChanged = (value: number):ZoomChangedAction => ({
    type: "ZOOM_CHANGED",
    value
})

export const hoverChanged = (element?: string):HoverChangedAction => ({
    type: "HOVER_CHANGED",
    element
})

export type IdeAction = ZoomChangedAction | HoverChangedAction | OptionChangedAction | ToggledAction

export type IdeState = {

    panels: OptionState
    toggles: ToggleState
    zoom: number
    hoveredElement?: string
}

const stateInit:IdeState = {
    zoom: 1,
    panels: { },
    toggles: { },
    
} 

export const getZoom = (state:IdeState) => state.zoom;

export const ideReducer = (state:IdeState = stateInit, action: IdeAction):IdeState => {

    if (action.type == "ZOOM_CHANGED") {
        return {
            ...state, 
            zoom: action.value
        }
    }

    if (action.type == "HOVER_CHANGED") {
        return {
            ...state, 
            hoveredElement: action.element
        }
    }

    return { 
        ...state,
        toggles: toggleReducer(state.toggles, action as any),
        panels: optionReducer(state.panels, action as any)
    };


}



export const IDE = "ide";

const selectIde = (s:any):IdeState => s[IDE];

export const useActivePanelState = (subject: string, allowNone: boolean = true):[string,(v:string) => void] => {  
    const value = useSelector<any,string>(s => selectIde(s).panels[subject] || "");
    const dispatch = useDispatch();
    return [
        value,
        (value: string) => dispatch(optionChanged(subject, value, allowNone))
    ];
}
 
// export const useToggleState = (subject: string):[boolean, () => void] => {
//     const value = useSelector<any,boolean>(s => !!selectIde(s).toggles[subject]);
//     const dispatch = useDispatch();
//     return [
//         value,
//         () => dispatch(toggled(subject))
//     ];
// } 

export const useZoomState = ():[number, (v:number) => void] => {
    const value = useSelector<any,number>(s => selectIde(s).zoom);
    const dispatch = useDispatch();
    return [
        value,
        (value: number) => dispatch(zoomChanged(value))
    ];
}

export const useHoverState = ():[string|undefined, (v:string|undefined) => void] => {
    const value = useSelector<any,string|undefined>(s => selectIde(s).hoveredElement);
    const dispatch = useDispatch();
    return [
        value,
        (element:string|undefined) => dispatch(hoverChanged(element))
    ];
}