import * as React from "react";

import { SearchField } from "./uiShell/controls/SearchField";
import { DocSelection } from "./doc/docState";
import { ComponentCard } from "./ComponentCard";
import { useDocLibState } from "./doc/docLibSelectors";
import { ComponentUri } from "./doc/docMetadata";

interface Props extends DocSelection {
    
}

const defaultRenderer = (componentUri: ComponentUri) => <div />;

export const ElementInsertSection:React.SFC<Props> = (props) => {

    const { libs, editorExtensions } = useDocLibState(s => s);
    const [value, setValue] = React.useState("");

    return (
        <>
            <div key="l3" className="l3 row">
                <SearchField 
                    className="stretch"
                    value={value} 
                    onChange={setValue} 
                    placeholder="Filter ..." />
            </div> 

            <div key="body" className="panel-body bg-dotted">
                {
                    Object.keys(libs.byName).map(libName => {
                        const lib = libs.byName[libName];
                        const editorExt = editorExtensions.byName[libName]
                        return (
                            <div key={libName} className="section">
                                {Object.keys(lib.components).map(compName => {
                                    const component = (editorExt? editorExt.componentCards[compName]: undefined) || defaultRenderer;
                                    return <ComponentCard 
                                        key={compName} 
                                        componentUri={{ lib: libName, component: compName }}
                                        renderComponent={component} />;
                                })} 
                            </div>
                        );
                    }) 
                }
            
            </div>
        </>
    );
}