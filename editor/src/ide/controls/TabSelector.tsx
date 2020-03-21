import * as React from "react";
import TabSelectorContext from "./TabSelectorContext";

interface Props {
    style?: React.CSSProperties
    value?: string
    onChange?: (value:string) => void
    
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

            <div className="tab-selector" style={props.style}>
                {props.children}
            </div>

        </TabSelectorContext.Provider>
    );
}