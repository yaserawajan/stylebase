import { useSelector } from "react-redux";

import { selectDocState, selectActiveSelection } from "../docEditor/docEditorSelectors";
import { DocState, ElementProps, DocSelection } from "./docState";


const noProps = {}

export const selectDocElementProps = (element:string) => 
    (s:any) => {
        const activeComponent = selectActiveSelection<DocSelection>(s).component;
        if (!activeComponent) return noProps;
        const c = selectDocState<DocState>(s).components.byName[activeComponent];
        if (!c) return noProps;
        const el = c.elements.byName[element];
        if (!el) return noProps;
        return el.props;
    }



export const useDocElementProps = (element: string) => useSelector<any, ElementProps>(selectDocElementProps(element));
    