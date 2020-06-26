
export type AnyDataType = {
    type: "any";
};

export type MapPropDesc = PropMetadata & {
    required?: boolean;
};

export type MapDataType = {
    type: "map";
    properties: {
        [propName: string]: MapPropDesc;
    };
};

export type ArrayDataType = {
    type: "array";
    itemType: PropMetadata;
};

export type TextDataType = {
    type: "text";

};

export type BooleanDataType = {
    type: "boolean";

};

export type NumberDataType = {
    type: "number";
    min?: number;
    max?: number;
    step?: number;
    stepExclusive?: boolean;
    precision?: number;
};

export type MediaDataType = {
    type: "media";
};

export type ElementRefDataType = {
    type: "elementRef";
};

export type EntityRefDataType = {
    type: "entityRef";
    dataSourceUri?: string;
    inlineData?: any[];
};

export type PropMetadata =
    AnyDataType |
    MapDataType |
    ArrayDataType |
    BooleanDataType |
    TextDataType |
    NumberDataType |
    MediaDataType |
    EntityRefDataType |
    ElementRefDataType | { type: string; lib: string; };

export type PropMapMetadata = {
    [propName: string]: MapPropDesc;
};
