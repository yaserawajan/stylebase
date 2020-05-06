import * as React from "react";
import { Input } from "../../../uiShell/controls/Input";
import { Paginator } from "./Paginator";
import { usePaginatedList } from "../../../patterns/usePaginatedList";
import { FontFamily } from "../../types";
import { FontSwatch } from "./FontSwatch";
import { classes } from "../../../uiShell/utils";
import { findFonts } from "../../webFontUtils";

interface Props {
    style?: React.CSSProperties
    className?: string
    value: FontFamily
    onChange: (value: FontFamily) => void
}

const areEqual = (f1: FontFamily, f2: FontFamily) => f1.name == f2.name && f1.provider == f2.provider;

export const FontFamilyExplorer:React.FC<Props> = (props) => {

    const api = usePaginatedList<FontFamily,{ q : string }>({ 
        initParams: {
            filter: { q: "" },
            limit: 10,
            offset: 0
        },
        fetcher: (params) => 
            findFonts(params.filter.q, params.offset, params.limit)
                .then(({ data, total }) => ({
                    request: params,
                    total,
                    data
                }))
        
    });

    const selectHandler = (value: FontFamily) => () => props.onChange(value);

    return (
        <div className={classes("column", props.className)} style={props.style}>
            
            <Input 
                key="filter"
                placeholder="Filter by Font Name ..." 
                value={api.lastRequested.filter.q} 
                onChange={q => api.setFilter({ q })} />
            
            {api.isLoading

                ? <div>Loading ...</div>

                : (api.data.length > 0
                    ? <Paginator 
                        key="pg" 
                        offset={api.lastRequested.offset} 
                        pageSize={10} 
                        total={api.total}
                        onOffsetChange={api.setOffset} />

                    : <div>Nothing Found</div>)}

            {api.data.map((i:FontFamily) => 
                <FontSwatch 
                    key={`${i.name}-${i.provider}`}
                    onClick={selectHandler(i)}
                    weight={400}
                    letterSpacing={0} 
                    italic={false} 
                    smallCaps={false} 
                    family={i} 
                    className={classes(areEqual(props.value, i) && "selected" )} />)}

            
        </div>
    );
}