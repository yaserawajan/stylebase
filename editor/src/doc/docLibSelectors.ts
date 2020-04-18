
import { DocLibState } from "./docLibModels"
import { DOC_LIB } from "./docLibReducer"


export const selectDocLibState = (store:any):DocLibState => store[DOC_LIB];


export const selectLibCollection = (s: DocLibState) => s.libs.byName;





