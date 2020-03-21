export type OptionChangedAction = {
    type: "OPTION_SELECTED",
    subject: string,
    value: string
}

export type OptionState = {
    [subject:string]: string
}

export const optionInit:OptionState = {}

export const optionChanged = (subject: string, value: string):OptionChangedAction => ({
    type: "OPTION_SELECTED",
    subject, 
    value
});

export const optionReducer = 
    (state:OptionState, action:OptionChangedAction) => {

        if (action.type == "OPTION_SELECTED") {
            return {
                ...state, 
                [action.subject]: action.value
            };
        }

        return state;
    }
