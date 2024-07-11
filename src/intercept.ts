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

type InterceptType<P extends {}> = {

    readonly type: "replace"
    readonly element: ValueOrFactory<ReactNode, [ComponentType<P>]>

} | {

    readonly type: "transform"
    readonly props: P

}

export function intercept<I extends {}, O extends {}>(intercept: (props: I) => InterceptType<O>) {
    return (component: ComponentType<O>) => {
        return (props: I) => {
            const result = callOrGet(intercept(props), component)
            if (result.type === "replace") {
                return createElement(Fragment, { children: callOrGet(result.element, component) })
            }
            else {
                return createElement(component, result.props)
            }
        }
    }
}
