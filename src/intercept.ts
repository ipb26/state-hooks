import { ComponentType, createElement, Fragment, ReactNode } from "react"
import { callOrGet, ValueOrFactory } from "value-or-factory"

/**
 * Wraps the transformed component as a child of another.
 */
export function wrapped<I extends {}, W extends {}>(wrapper: ComponentType<W>, wrapperProps: ValueOrFactory<W, [I]>) {
    return intercept((props: I) => {
        return {
            type: "transform",
            props: props,
            render: children => createElement(wrapper, { ...callOrGet(wrapperProps, props), children })
        }
    })
}

// TODO just these 2, or split to 4? replace,wrap,transformProps,wrapWithProps

type InterceptType<P extends {}> = {

    readonly type: "replace"
    readonly element: ValueOrFactory<ReactNode, [ComponentType<P>]>

} | {

    readonly type: "transform"
    readonly props: P
    readonly render?: ((children: ReactNode) => ReactNode) | undefined

}

export function intercept<I extends {}, O extends {}>(intercept: (props: I) => InterceptType<O>) {
    return (component: ComponentType<O>) => {
        return (props: I) => {
            const result = intercept(props)
            if (result.type === "replace") {
                return createElement(Fragment, { children: callOrGet(result.element, component) })
            }
            else {
                const children = createElement(component, result.props)
                if (result.render === undefined) {
                    return children
                }
                return result.render(children)
            }
        }
    }
}
