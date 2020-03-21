import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IdeState } from "../ideState";
import { toggled } from "./toggleState";

interface InputContext {
    isToggled?: boolean
    toggle: () => void 
}

interface Props {
    children: (ctx: InputContext) => JSX.Element
    subject: string
}

export const Toggler:React.SFC<Props> = (props) => {

    const isToggled = useSelector<IdeState,boolean>(s => s.toggles[props.subject]);
    const dispatch = useDispatch();
    const toggle = () => dispatch(toggled(props.subject));

    return props.children({ isToggled, toggle });
}

