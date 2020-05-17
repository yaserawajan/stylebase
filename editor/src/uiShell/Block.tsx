import * as React from "react";
import { Palette, Scale } from "./types";
import { classes } from "./utils";

type IndentLevel = 0 | 1 | 2;
type Indent = IndentLevel | [IndentLevel, IndentLevel] | [IndentLevel, IndentLevel, IndentLevel, IndentLevel]

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    palette?: Palette
    scale?: Scale
    bg?: Palette
    indent?: Indent
}

const edges = ["top", "right", "bottom", "left"]
const indentClasses = (i: Indent):string => {
    const a = (i instanceof Array) ? i : [ i ];
    const l = a.length;
    return edges.map((e, idx) => `ind-${e}-${a[idx % l]}`).join(' ');
}

export const Block:React.SFC<Props> = ({ className: passedClassName, bg, palette, scale, children, indent, ...rest }) => {

    const className = classes(
        passedClassName, 
        "block",
        palette && `pal-${palette}`,
        scale && `scale-${scale}`,
        bg && `bg-${bg}`,
        indent && `ind ${indentClasses(indent)}`
    );

    return (
        <div {...rest} className={className}>
            {children}
        </div>
    );
}