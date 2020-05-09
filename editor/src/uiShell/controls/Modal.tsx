import * as React from "react";
import ReactDOM = require("react-dom");
import { Title } from "./Title";

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
            <div className="dialog">
                {props.title && <div className="title scale-2 row row-indent-2 palette-3 dark"><Title>{props.title}</Title></div>}
                <div className="body scale-3 row">{props.children}</div>
            </div>
        </div>, 
        document.getElementById("root_modal")
    )
}
