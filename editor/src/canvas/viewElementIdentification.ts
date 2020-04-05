const ISOLATION_SUFFIX = "Sb";

export type ElementId = { [k:string]: string }

export const elementIdFromJsx = (subject: JSX.Element, idProps: string[]):ElementId => {
    let o:any = {};
    idProps.forEach(propName => {
        const value = subject.props[propName];
        if (value) o[propName] = value;
    });
    return o;
}

export const elementIdFromDom = (subject: HTMLElement, idProps: string[]):ElementId => {
    let o:any = {};
    idProps.forEach(propName => {
        const value = subject.dataset[propName + ISOLATION_SUFFIX];
        if (value) o[propName] = value;
    });
    return o;
}

export const setElementId = (subject: HTMLElement, idMap: ElementId) => {
    // pulish id props as data props
    for (const k in idMap) {
        if (idMap[k]) subject.dataset[k + ISOLATION_SUFFIX] = idMap[k];
    }
}

export const isElementIdEmpty = (elementId:ElementId):boolean => {
     return Object.keys(elementId).length < 1;
}

