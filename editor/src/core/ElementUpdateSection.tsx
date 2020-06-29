import * as React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { useDocElementState } from "./doc/docHooks";
import { selectComponentMetadata } from "./doc/docLibSelectors";
import { PropEditor } from "./propEditors/PropEditor";
import { Tree } from "./uiState/Tree";
import { PropEditorFactory } from "./doc/docModels";
import { docElementUpdate, docActionSet } from "./doc/state/actions";
import { actionUpdate } from "../patterns/docEditor/docEditorState";
import { Block } from "../uiShell/Block";
import { Col } from "../uiShell/layouts";

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
        
        <Block palette="light-grey-4" scale={3}>
            <Col>
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
            </Col>
        </Block>
    );
}