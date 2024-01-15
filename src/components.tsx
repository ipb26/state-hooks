import { Fragment, ReactNode } from "react"

export type MaybeProps<T> = {

    readonly value: T | undefined | null
    readonly children: (value: T) => ReactNode
    readonly otherwise?: ReactNode | undefined

}

export function Maybe<T>(props: MaybeProps<T>) {
    if (props.value === undefined || props.value === null) {
        return <Fragment children={props.otherwise} />
    }
    return <Fragment children={props.children(props.value)} />
}
