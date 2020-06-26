export type UnaryArgs = {
    operand: Expression<any>
}

export type BinaryArgs = {
    left: Expression<any>
    right: Expression<any>
}

export type ExpressionTypes = {
    param: {
        name: string
    }

    const: {
        value: any
    }

    switch: BinaryArgs & {
        condition: Expression<any>
    }

    concat: BinaryArgs

    index: BinaryArgs

    key: BinaryArgs
}

export type Expression<T extends keyof ExpressionTypes> = {
    type: T
} & ExpressionTypes[T]

export type ExpressionType = keyof ExpressionTypes;

