import * as React from "react";
import ReactDOM = require("react-dom");
import { Title } from "./Title";
import { Block } from "../Block";
import { Col } from "../layouts";

interface Props {
    title?: string
    onCancel?: () => void
}

export const Modal:React.SFC<Props> = (props) => {

    const ref = React.useRef(null);

    const handleClick = (e:any) => {
        if (e.target !== ref.current) return;
        if (props.onCancel) props.onCancel();
    }

    return ReactDOM.createPortal(
        <div ref={ref} className="modal" onClick={handleClick}>
            <Col className="dialog">
                {props.title && <Block palette="dark-grey-3" scale={2}><Title>{props.title}</Title></Block>}
                <Col className="body">{props.children}</Col>
            </Col>
        </div>, 
        document.getElementById("root_modal")
    )
}
