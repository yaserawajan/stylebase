import "./component_card.css";

import * as React from "react";

import { classes } from "./uiShell/utils";
import { ErrorShield } from "./ErrorShield";
import { ComponentUri } from "./doc/docModels";
import { useDraggableAsset } from "./uiState/useDraggableAsset";

interface Props {
    style?: React.CSSProperties
    className?: string
    renderComponent: (componentUri: ComponentUri) => JSX.Element
    componentUri: ComponentUri
}

export const ComponentCard = (props:Props) => {

    const drag = useDraggableAsset({ type: "component", uri: props.componentUri, props: { } });

    return (
        <div className={classes("component-card", props.className)} style={props.style}>
            <div key="label" className="title">{props.componentUri.component} @ {props.componentUri.lib}</div>
            <div key="sublabel" className="subtitle">{props.componentUri.lib}</div>
            <div ref={drag} key="container" className="container">
                <ErrorShield>
                    {props.renderComponent(props.componentUri)}
                </ErrorShield>
            </div>
        </div>
    );
}