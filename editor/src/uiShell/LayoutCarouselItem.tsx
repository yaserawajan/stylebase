import * as React from "react";

interface Props {

}

export const LayoutCarouselItem:React.SFC<Props> = (props) => {

    return (
        <div className="layout-carousel-item">

            {props.children}
            
        </div>
    )
}