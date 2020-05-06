

export const ELEMENT_ID_ATTR = "editorId";

export type ElementId = string

export const elementIdFromDom = (subject: HTMLElement):ElementId => subject.dataset[ELEMENT_ID_ATTR];

export const setElementId = (subject: HTMLElement, id: ElementId) => {
    subject.dataset[ELEMENT_ID_ATTR] = id;
}
