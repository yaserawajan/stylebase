export type OptionChangedAction = {
    type: "OPTION_SELECTED",
    subject: string,
    value: string,
    allowNone: boolean
}

export type OptionState = {
    [subject:string]: string
}

export const optionInit:OptionState = {}

export const optionChanged = (subject: string, value: string, allowNone: boolean):OptionChangedAction => ({
    type: "OPTION_SELECTED",
    subject, 
    value,
    allowNone
});

export const optionReducer = 
    (state:OptionState, action:OptionChangedAction):OptionState => {

        if (action.type == "OPTION_SELECTED") {
            
            const value = (state[action.subject] == action.value &&  
                action.allowNone) 
                ? ""
                : action.value;

            return {
                ...state, 
                [action.subject]: value
            };
        }

        return state;
    }



 