import * as React from "react";

interface Props {
    margin: number
}

export const DocumentMargin:React.SFC<Props> = ({ margin, children }) => {

    return (
        <div style={{ padding: margin }}>
            {children}
        </div>
    );
}