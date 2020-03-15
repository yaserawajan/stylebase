import * as React from "react";

const TabSelectorContext = React.createContext({
    value: "",
    selectTab: (name: string) => {}
});

export default TabSelectorContext;