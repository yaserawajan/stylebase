import { OptionState, OptionChangedAction, optionReducer } from "./option/optionState";
import { ToggleState, ToggledAction, toggleReducer } from "./toggle/toggleState";

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
    options: OptionState
    toggles: ToggleState
    zoom: number,
    hoveredElement?: string
}

const stateInit:IdeState = {
    zoom: 1,
    options: { },
    toggles: { }
}

export const getZoom = (state:IdeState) => state.zoom;

export const ideReducer = (state:IdeState = stateInit, action: IdeAction) => {

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
        options: optionReducer(state.options, action as any)
    };


}