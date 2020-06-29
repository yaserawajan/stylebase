import { EntitySet } from "../../../patterns/entitySet/entitySetModels";
import { PropMetadata } from "../dataTypes/models";
import { PropsMap, ElementDesc } from "../docModels";



export type DocSelection = {
    component: string;
    elements: string[];
};

export type ComponentMetadataState = {
    props: EntitySet<PropMetadata>;
};

export type ComponentState = {
    propTypes: EntitySet<PropMetadata>;
    defaultProps: PropsMap;
    rootElement: string;
    elements: EntitySet<ElementDesc>;

};

export type DocState = {
    //title: string
    components: EntitySet<ComponentState>;
    imports: string[];
};
