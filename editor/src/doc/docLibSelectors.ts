import { useSelector } from "react-redux";

import { DocLibState } from "./docLibModels"
import { DOC_LIB } from "./docLibReducer"


const selectDocLibState = (store:any):DocLibState => store[DOC_LIB];

export const selectAvailableAssets = () => {

}

export const selectLibCollection = (s: DocLibState) => s.libs.byName;

export const useDocLibState = <TResult>(selector: (docLibState: DocLibState) => TResult, 
    eq?: (r1:TResult,r2:TResult) => boolean) => {
    return useSelector<any, TResult>(s => selector(selectDocLibState(s)), eq);
}




