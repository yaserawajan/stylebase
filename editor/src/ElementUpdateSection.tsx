import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Title } from "./uiShell/controls/Title";
import { useDocElementState } from "./doc/docHooks";
import { selectComponentMetadata } from "./doc/docLibSelectors";
import { PropEditor } from "./propEditors/PropEditor";
import { Tree } from "./Tree";
import { PropEditorFactory } from "./doc/docModels";
import { docElementUpdate, docActionSet } from "./doc/docActions";
import { actionUpdate } from "./docEditor/docEditorState";

interface Props {
    renderPropEditor: PropEditorFactory
    component: string
    elementIds: string[]
}

export const ElementUpdateSection:React.SFC<Props> = (props) => {

    const element = useDocElementState(props.component, props.elementIds[0]);
    const metadata = useSelector(s => selectComponentMetadata(s, element.type));
    const dispatch = useDispatch();

    const handleChange = React.useCallback((propName: string, value: any) => {

        const actions = props.elementIds
            .map(id => 
                docElementUpdate(props.component, id, {
                    ...element.props,
                    [propName]: value
                }));

        dispatch(actionUpdate(docActionSet(actions)));

    }, [props.component, props.elementIds]);

    return (
        <>
            <div key="l3" className="l3 row">
                <Title>Properties</Title>
            </div>
            <div key="body" className="panel-body">
                <Tree name={element.type.component}>

                    {Object.keys(metadata).map(propName => (
                        (propName != "children") && <PropEditor 
                            key={propName} 
                            propType={metadata[propName]}
                            propName={propName}
                            onChange={handleChange}
                            value={element.props[propName]}
                            renderPropEditor={props.renderPropEditor} />
                    ))}
                    
                </Tree>
            </div>
        </>
    );
}