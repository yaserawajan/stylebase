import * as React from "react";
import { Header } from "./uiShell/controls/Header";
import { TabSelector } from "./uiShell/controls/TabSelector";
import { Tab } from "./uiShell/controls/Tab";

interface Props {
    
}

export const ElementUpdateSection:React.SFC<Props> = (props) => {

    return (
        <>
            <Header>
                <div className="ph2">
                    <TabSelector value={"allProps"} onChange={() => {}}>
                        <Tab name="allProps" label="Properties" />
                        <Tab name="typographyProps" label="Typography" />
                        <Tab name="skinProps" label="Colours" />
                    </TabSelector>
                </div>
            </Header>
            
            <div className="scroll-area">
                <div className="p3">
                    
                </div>
                
            </div>
        </>
    );
}