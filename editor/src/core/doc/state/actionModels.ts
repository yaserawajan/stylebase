import { PropMetadata } from "../dataTypes/models";
import { ComponentUri, PropsMap } from "../docModels";
type LocationBefore = {
    component: string;
    containerElement: string;
    before?: string;
};
type LocationAfter = {
    component: string;
    containerElement: string;
    after?: string;
};

export type ElementLocation = LocationBefore | LocationAfter;

export type ElementAddAction = {
    type: "ELEMENT_ADD";
    elementType: ComponentUri;
    props: PropsMap;
    location: ElementLocation;
};

export type ElementMoveAction = {
    type: "ELEMENT_MOVE";
    fromComponent: string;
    fromElementId: string;
    location: ElementLocation;
};

export type ElementRemoveAction = {
    type: "ELEMENT_REMOVE";
    component: string;
    elementId: string;
};


export type ElementUpdateAction = {
    type: "ELEMENT_UPDATE";
    component: string;
    elementId: string;
    props: PropsMap;
};

export type ComponentAddAction = {
    type: "COMPONENT_ADD";
    name: string;
};

export type ComponentRenameAction = {
    type: "COMPONENT_RENAME";
    oldName: string;
    newName: string;
};

export type ComponentParamAddAction = {
    type: "COMPONENT_PARAM_ADD";
    component: string;
    paramType: PropMetadata;
    paramName: string;
    defaultValue: any;
    required: boolean;
};

export type ComponentParamUpdateAction = {
    type: "COMPONENT_PARAM_UPDATE";
    component: string;
    paramName: string;
    paramType?: PropMetadata;
    //defaultValue: any
    required?: boolean;
};

export type ComponentParamRemoveAction = {
    type: "COMPONENT_PARAM_REMOVE";
    component: string;
    paramName: string;
};

export type DocActionSet = {
    type: "ACTION_SET";
    actions: DocAction[];
};

export type DocAction =
    ElementAddAction | ElementMoveAction | ElementRemoveAction | ElementUpdateAction |
    ComponentAddAction | ComponentRenameAction |
    ComponentParamAddAction | ComponentParamUpdateAction | ComponentParamRemoveAction |
    DocActionSet;

    