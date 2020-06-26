import { PropMetadata, ArrayDataType, MapDataType } from "../doc/dataTypes/models";

export const isArray = (value: PropMetadata) => value.type == "array";

export const arrayUnwrap = (value: PropMetadata) => 
    isArray(value)
        ? (value as ArrayDataType).itemType
        : value;

export const createTypeDefault = (typeUri: string):PropMetadata => {
    const { lib, type } = parseType(typeUri);
    if (type == "map") return { type, properties: {} }
    else return { type, lib }
}

export const arrayWrap = (unwrappedType: PropMetadata, multiplicity: boolean)
    : PropMetadata => {
    return multiplicity
        ? { type: "array", itemType: unwrappedType } as ArrayDataType
        : unwrappedType;
}

export const parseType = (typeUri: string) => {
    let type = typeUri;
    let lib:string = undefined;
    if (typeUri.indexOf(":") !== -1) {
        [lib, type] = typeUri.split(':');
    }
    return { lib, type }
}

export const selectValue = (typeModel: PropMetadata, path: string):PropMetadata => {
    if (path == "") return typeModel;

    const arrayUnwrapped = arrayUnwrap(typeModel);

    const [propOrIndex, ...further] = path.split('.');
    if (arrayUnwrapped.type == "map") {
        const map = arrayUnwrapped as MapDataType;
        const nextModel = map.properties[propOrIndex];
        if (nextModel) return selectValue(nextModel, further.join('.'));
    }

    return { type: "any" }
}

export const replaceNode = (typeModel: PropMetadata, path: string, newValue: PropMetadata):PropMetadata => {

    if (path == "") return newValue;

    const multiplicity = isArray(typeModel);
    const arrayUnwrapped = arrayUnwrap(typeModel);

    const [propOrIndex, ...further] = path.split('.');
    if (arrayUnwrapped.type == "map") {
        const map = arrayUnwrapped as MapDataType;
        const nextModel = map.properties[propOrIndex];
        if (nextModel) return arrayWrap({ 
            ...map, 
            properties: { 
                ...map.properties,
                [propOrIndex]: replaceNode(nextModel, further.join('.'), newValue) 
            } 
        }, multiplicity); 
    }

    return typeModel;
}
