import * as React from "react";
import { RectContext } from "./types";

const ctx = React.createContext<RectContext>({ rectMap: {}, topShift: 0, leftShift: 0 });

export default ctx;