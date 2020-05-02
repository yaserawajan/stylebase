import * as React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { Title } from "./uiShell/controls/Title";
import { useDocElementState } from "./core/doc/docHooks";
import { selectComponentMetadata } from "./core/doc/docLibSelectors";
import { PropEditor } from "./core/propEditors/PropEditor";
import { Tree } from "./core/uiState/Tree";
import { PropEditorFactory } from "./core/doc/docModels";
import { docElementUpdate, docActionSet } from "./core/doc/docActions";
import { actionUpdate } from "./patterns/docEditor/docEditorState";

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
            <div key="l3" className="l3 row">
                <Title>Properties</Title>
            </div>
            <div key="body" className="panel-body stretch">
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
            </div>
        </>
    );
}