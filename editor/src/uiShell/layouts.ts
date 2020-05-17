import { styledHtmlComponent } from "./utils";

export const Row = styledHtmlComponent({ tag: "div", addClassName: "row" });
export const Col = styledHtmlComponent({ tag: "div", addClassName: "column" });
export const Fluid = styledHtmlComponent({ tag: "div", addClassName: "fluid" });