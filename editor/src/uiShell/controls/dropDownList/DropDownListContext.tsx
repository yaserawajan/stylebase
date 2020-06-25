import React = require("react")

type DropDownListContext = {
    value: any
    onChange: (value: any) => void
}

export const ctx = React.createContext<DropDownListContext>({
    value: "",
    onChange: () => { }
})