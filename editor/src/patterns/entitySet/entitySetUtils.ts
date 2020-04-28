import { EntitySet } from "./entitySetModels";

export const entitySetUpdate = <TEntity>(set: EntitySet<TEntity>, id: string, props: Partial<TEntity>):EntitySet<TEntity> => {
    return {
        ...set,
        byName: {
            ...set.byName,
            [id]: {
                ...set.byName[id],
                ...props
            }
        }
    }
}

export const entitySetAdd = <TEntity>(set: EntitySet<TEntity>, id: string, props: TEntity):EntitySet<TEntity> => {
    return {
        ...set,
        all: [...set.all, id],
        byName: {
            ...set.byName,
            [id]: props
        }
    }
}

export const entitySetMap = <TEntity,TResult>(set: EntitySet<TEntity>, selector: (e: TEntity) => TResult) => {
    let a:TResult[] = [];
    for (const k in set.byName) {
        const e = set.byName[k];
        a.push(selector(e));
    }
    return a;
}