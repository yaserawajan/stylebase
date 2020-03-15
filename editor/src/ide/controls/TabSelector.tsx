import * as React from "react";
import TabSelectorContext from "./TabSelectorContext";

interface Props {
    value?: string
    onChange?: (value:string) => void
    allowNoSelection: boolean
}

export const TabSelector:React.SFC<Props> = (props) => {

    const handleSelect = (value: string) => {
        if (props.onChange) props.onChange(value);
    }

    return (
        <TabSelectorContext.Provider 
            value={{
                value: props.value,
                selectTab: handleSelect
            }}>

            <div className="tab-selector">
                {props.children}
            </div>

        </TabSelectorContext.Provider>
    );
}