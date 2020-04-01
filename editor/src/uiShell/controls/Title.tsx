import * as React from "react";

interface Props {

}

export const Title:React.SFC<Props> = (props) => {

    return (

        <div className="title">
            {props.children}
        </div>

    );
}