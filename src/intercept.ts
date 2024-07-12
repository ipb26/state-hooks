import { ComponentType, createElement, Fragment, ReactNode } from "react"
import { callOrGet, ValueOrFactory } from "value-or-factory"

/**
 * Wraps the transformed component as a child of another.
 */
export function wrapped<I extends {}, W extends {}>(wrapper: ComponentType<W>, wrapperProps: ValueOrFactory<W, [I]>) {
    return (component: ComponentType<I>) => {
        return (props: I) => {
            return createElement(wrapper, {
                ...callOrGet(wrapperProps, props),
                children: createElement(component, props)
            })
        }
    }
}

// TODO just these 2, or split to 4? replace,wrap,transformProps,wrapWithProps

type InterceptType<P extends {}> = {

    readonly type: "replace"
    readonly element: ValueOrFactory<ReactNode, [ReactNode]>

} | {

    readonly type: "transform"
    readonly props: P
    readonly wrap?: ((node: ReactNode) => ReactNode) | undefined

}

export function intercept<I extends {}, O extends {}>(intercept: (props: I) => InterceptType<O>) {
    return (component: ComponentType<O>) => {
        return (props: I) => {
            const result = intercept(props)
            if (result.type === "replace") {
                return createElement(Fragment, { children: callOrGet(result.element, createElement(component)) })
            }
            else {
                const rendered = createElement(component, result.props)
                if (result.wrap === undefined) {
                    return rendered
                }
                return result.wrap(rendered)
            }
        }
    }
}
