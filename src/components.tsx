import { AnchorHTMLAttributes, DetailedHTMLProps, MouseEvent, useCallback } from "react"

export type MaybeProps<T> = {
    value: T | undefined
    render: (value: T) => JSX.Element
    otherwise?: JSX.Element
}

export function Maybe<T>(props: MaybeProps<T>) {
    if (props.value === undefined) {
        return props.otherwise ?? null
    }
    return props.render(props.value)
}

export type AnchorProps = Omit<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href">

export function Anchor(props: AnchorProps) {
    const { onClick, ...rest } = props
    const click = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        event.stopPropagation()
        onClick?.(event)
    }, [onClick])
    return (
        <a href={onClick === undefined ? undefined : ""} onClick={click} {...rest} />
    )
}
