import { Expression, ExpressionTypes } from "./models";

export type EvalContext<T extends keyof ExpressionTypes> = {
    expression: Expression<T>
    getEvaluator: <K extends keyof ExpressionTypes = any>(expr: ExpressionTypes[K]) => Evaluator<K>
    scopeVars: {
        [param:string] : any
    }
}

export type Evaluator<T extends keyof ExpressionTypes> = (ctx: EvalContext<T>) => any

type EvaluatorMap = {
    [K in keyof ExpressionTypes]: Evaluator<K>
}

const evaluationMap:EvaluatorMap = {
    concat: null,
    const: ctx => ctx.expression.value,
    index: null,
    key: null,
    param: ({ expression, scopeVars }) => scopeVars[expression.name],
    switch: null
}

export default evaluationMap;