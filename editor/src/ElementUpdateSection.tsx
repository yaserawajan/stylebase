import * as React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { useDocElementState } from "./core/doc/docHooks";
import { selectComponentMetadata } from "./core/doc/docLibSelectors";
import { PropEditor } from "./core/propEditors/PropEditor";
import { Tree } from "./core/uiState/Tree";
import { PropEditorFactory } from "./core/doc/docModels";
import { docElementUpdate, docActionSet } from "./core/doc/docActions";
import { actionUpdate } from "./patterns/docEditor/docEditorState";
import { PanelBody } from "./uiShell/panel/PanelBody";

interface Props {
    renderPropEditor: PropEditorFactory
    component: string
    elementIds: string[]
}

export const ElementUpdateSection:React.SFC<Props> = (props) => {

    const element = useDocElementState(props.component, props.elementIds[0]);
    const { defaultProps, propTypes } = useSelector(s => selectComponentMetadata(s, element.type), shallowEqual);
    const dispatch = useDispatch();

    const handleChange = React.useCallback((propName: string, value: any) => {
        
        const actions = props.elementIds
            .map(id => 
                docElementUpdate(props.component, id, {
                    
                    [propName]: value
                }));
        
        dispatch(actionUpdate(docActionSet(actions)));

    }, [props.component, props.elementIds, element]);

    return (
        <>
            <div key="l3" className="scale-3 row pdl-4 pdr-4 palette-3">
                <div className="text"><strong>Properties</strong></div>
            </div>
            <PanelBody key="body" className="column separator scale-4 palette-4">
                <Tree name={element.type.component} key={props.component + "/" + props.elementIds[0]}>

                    {Object.keys(propTypes).map(propName => (
                        (propName != "children") && <PropEditor 
                            key={propName} 
                            compact={false}
                            path={ [ props.component, propName ] }
                            propType={propTypes[propName]}
                            propName={propName}
                            onChange={handleChange}
                            value={element.props[propName]}
                            defaultValue={defaultProps[propName]}
                            renderPropEditor={props.renderPropEditor} />
                    ))}
                    
                </Tree>
            </PanelBody>
        </>
    );
}