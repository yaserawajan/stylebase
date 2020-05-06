
import * as React from "react";
import { IconLA } from "./IconLA";
import { classes } from "../utils";

interface Props {
    className?: string
    style?: React.CSSProperties
    label?: string
    placeholder: string
    value: string
    onChange: (value: string) => void
}

export const SearchField:React.SFC<Props> = ({ value, onChange, placeholder, style, className }) => {

    const handleChange = React.useCallback((e:any) => {
        onChange(e.target.value);
    }, [onChange]);

    return (
        <div className={classes("search-field", className)} style={style}>
            <input type="text" 
                size={1}
                className="stretch"
                value={value} 
                onChange={handleChange} 
                placeholder={placeholder} />
            <div className="search-field-icon"><IconLA icon="search" /></div>
        </div>
    );
}