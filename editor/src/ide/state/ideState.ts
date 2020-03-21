import { OptionState, OptionChangedAction, optionReducer } from "./option/optionState";
import { ToggleState, ToggledAction, toggleReducer } from "./toggle/toggleState";

export type IdeAction = OptionChangedAction | ToggledAction

export type IdeState = {
    options: OptionState
    toggles: ToggleState

}

const stateInit:IdeState = {
    options: { },
    toggles: { }
}

export const ideReducer = (state:IdeState = stateInit, action: IdeAction) => {







    return { 
        ...state,
        toggles: toggleReducer(state.toggles, action as any),
        options: optionReducer(state.options, action as any)
    };


}