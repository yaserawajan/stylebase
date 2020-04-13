import "./component_card.css";

import * as React from "react";

import { classes } from "./uiShell/utils";
import { ErrorShield } from "./ErrorShield";
import { useDrag } from "react-dnd";
import { ElementAddAction } from "./doc/docState";
import { ComponentUri } from "./doc/docMetadata";

interface Props {
    style?: React.CSSProperties
    className?: string
    renderComponent: (componentUri: ComponentUri) => JSX.Element
    componentUri: ComponentUri
      
}

let seq = 0;

export const ComponentCard:React.SFC<Props> = (props) => {

    const [{ }, drag] = useDrag({
        
        item: {
            type: "ELEMENT_ADD",
            component: props.componentUri,
            props: { },
            newId: (++seq).toString(),
            

        } as ElementAddAction,
        end: (result:any, monitor) => {
            
        }
    });
    
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