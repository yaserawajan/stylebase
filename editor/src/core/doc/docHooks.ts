import { useSelector, shallowEqual } from "react-redux";
import { selectDocElement } from "./state/stateSelectors";


export const useDocElementState = (component: string, id: string) => 
    useSelector(selectDocElement(component, id), shallowEqual);
    