import { useState, useEffect } from "react"

interface Params<TFilter> {
    filter: TFilter
    offset: number
    limit: number
}

export interface Result<TItem, TFilter> {
    data: TItem[]
    total: number
    request: Params<TFilter>
}

interface Options<TItem,TFilter> {
    fetcher: (params: Params<TFilter>) => Promise<Result<TItem, TFilter>>
    initParams?: Params<TFilter>
}

interface State<TItem, TFilter> {
    lastRequested: Params<TFilter>
    lastServed: Params<TFilter>
    data: TItem[]
    total: number
}

type Actions<TItem, TFilter> = {
    setFilter: (filter: Partial<TFilter>) => void
    setOffset: (offset: number) => void
    setLimit: (limit: number) => void
}

type Api<TItem, TFilter> = State<TItem, TFilter> & Actions<TItem, TFilter>  & { isLoading: boolean }

export const usePaginatedList = 
    <TItem = any,TFilter = {}>({ fetcher, initParams }: Options<TItem,TFilter>):Api<TItem, TFilter> => {

    const [state, setState] = useState<State<TItem, TFilter>>({ 
        lastRequested: initParams,
        total: 0,
        data: [],
        lastServed: undefined
    })
    
    const refresh = (params: Params<TFilter>) => {

        setState(stateOld => ({
            ...stateOld,
            lastRequested: params
        }));

        fetcher(params)
            .then(rs => {
                setState(stateOld => {
                    if (rs.request === stateOld.lastRequested) {
                        return {
                            ...stateOld,
                            data: rs.data,
                            total: rs.total,
                            lastServed: rs.request
                        }
                    }

                    return stateOld;
                })
            })
        
    }

    useEffect(() => {
        refresh(state.lastRequested);
    }, []);

    
    return {
        ...state,
        isLoading: state.lastRequested !== state.lastServed,

        setFilter: (filter) => {
            refresh({
                ...state.lastRequested,
                offset: 0,
                filter: {
                    ...state.lastRequested.filter,
                    ...filter
                }
            })
        },
        setLimit: (limit) => {
            refresh({
                ...state.lastRequested,
                offset: 0,
                limit
            })
        },
        setOffset: (offset) => {
            refresh({
                ...state.lastRequested,
                offset
            })
        }
    }

}