
import * as React from "react";

import { classes } from "../uiShell/utils";
import { ErrorShield } from "./ErrorShield";
import { ComponentUri, PropsMap } from "./doc/docModels";
import { useDraggableAsset } from "./uiState/useDraggableAsset";
import { Col } from "../uiShell/layouts";

interface Props {
    style?: React.CSSProperties
    className?: string
    componentUri: ComponentUri
    defaultProps: PropsMap
}

export const ComponentCard:React.SFC<Props> = (props) => {
    const drag = useDraggableAsset({ type: "component", uri: props.componentUri, props: props.defaultProps });

    return (
        
            <Col className={classes("component-card", props.className)} style={props.style}>
                <div ref={drag} key="container" className="thumbnail">
                    <ErrorShield message="Component Card Error">
                        {props.children}
                    </ErrorShield>
                </div>
                
            </Col>
        
    );
}