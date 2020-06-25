import * as React from "react";

interface Props {
    value?: boolean
    onChange?: (value: boolean) => void
}

const onChangeDefault = () => {}

export const Switch:React.SFC<Props> = ({ value = false, onChange = onChangeDefault }) => {

    const handleChange = (e:any) => {
        onChange(e.target.checked);
    }

    return (
        <label className="switch">
            <input type="checkbox" checked={value} onChange={handleChange} />
            <span className="slider round"></span>
        </label>
    )
}

