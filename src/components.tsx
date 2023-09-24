import { Fragment, ReactNode } from "react"

export type MaybeProps<T> = {

    value: T | undefined | null
    children(value: T): ReactNode
    otherwise?: ReactNode

}

export function Maybe<T>(props: MaybeProps<T>) {
    if (props.value === undefined || props.value === null) {
        return <Fragment children={props.otherwise} />
    }
    return <Fragment children={props.children(props.value)} />
}
