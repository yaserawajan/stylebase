import { useSelector, shallowEqual } from "react-redux";
import { selectDocElement } from "./docStateSelectors";


export const useDocElementState = (component: string, id: string) => 
    useSelector(selectDocElement(component, id), shallowEqual);
    