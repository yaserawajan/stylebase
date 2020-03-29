import * as React from "react";
import { RectContext } from "./types";

const ctx = React.createContext<RectContext>({ rectMap: {} });

export default ctx;