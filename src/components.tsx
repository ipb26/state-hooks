import { AnchorHTMLAttributes, DetailedHTMLProps, Fragment, MouseEvent, ReactNode, useCallback } from "react"

export type MaybeProps<T> = {
    value: T | undefined | null
    render(value: T): ReactNode
    otherwise?: ReactNode
}

export function Maybe<T>(props: MaybeProps<T>) {
    if (props.value === undefined || props.value === null) {
        return <Fragment children={props.otherwise} />
    }
    return <Fragment children={props.render(props.value)} />
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
