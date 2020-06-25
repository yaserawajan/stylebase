import * as React from "react";
import { ctx } from "./DropDownListContext";
import { classes } from "../../utils";

interface Props {
    
    value: any
}

export const DropDownListItem:React.SFC<Props> = (props) => {

    const { value: selectedValue, onChange } = React.useContext(ctx);

    const handleClick = () => onChange(props.value);

    const selected = props.value === selectedValue;

    return (
        <div className={classes("drop-down-list-item", selected && "selected")} onClick={handleClick}>
            {props.children}
        </div>
    )
}


