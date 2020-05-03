// import "./input_bar_list.css";

import * as React from "react";

interface Props {

}

export const InputBarList:React.SFC<Props> = (props) => {

    return (
        <div className="input-bar-list">
            {props.children}
        </div>
    );
}