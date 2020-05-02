import * as React from "react";
import { InputIcon } from "../../../core/propEditors/InputIcon";

interface Props {
    pageSize: number
    total: number
    offset: number
    onOffsetChange: (offset: number) => void
}

export const Paginator:React.SFC<Props> = ({ pageSize, total, offset, onOffsetChange }) => {

    const from = offset + 1;
    const to = Math.min(from + pageSize - 1, total);

    const changeHandler = (value: number) => () => onOffsetChange(value);

    const lastPageOffset = Math.floor(total / pageSize) * pageSize;

    return (
        <div className="row">
            <InputIcon onClick={changeHandler(0)} key="first" icon="angle-double-left" disabled={offset < 1} />
            <InputIcon onClick={changeHandler(offset - pageSize)} key="prev" icon="angle-left" disabled={offset < 1} />
            <div style={{ fontSize: 12 }} className="stretch text-center">{from} - {to}</div>
            <InputIcon onClick={changeHandler(offset + pageSize)} key="next" icon="angle-right" disabled={to == total} />
            <InputIcon onClick={changeHandler(lastPageOffset)} key="last" icon="angle-double-right" disabled={to == total} />
        </div>
    )
}