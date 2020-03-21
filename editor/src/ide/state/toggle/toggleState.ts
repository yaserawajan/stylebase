

export type ToggledAction = {
    type: "TOGGLED",
    subject: string
}

export const toggled = (subject: string):ToggledAction => ({
    type: "TOGGLED",
    subject
});



export type ToggleState = {
    [k:string]: boolean
}

export const toggleReducer = 
    (state:ToggleState, action:ToggledAction) => {

        if (action.type == "TOGGLED") {
            return {
                ...state, 
                [action.subject]: !state[action.subject]
            };
        }

        return state;
    }