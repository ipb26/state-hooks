import { ComponentType, createElement, Fragment, ReactNode } from "react"
import { callOrGet, ValueOrFactory } from "value-or-factory"

/**
 * Wraps the transformed component as a child of another.
 */
export function wrapped<I extends {}, W extends { children?: ReactNode | undefined }>(wrapper: ComponentType<W>, wrapperProps: ValueOrFactory<Omit<W, "children">, [I]>) {
    return intercept((props: I) => {
        return {
            type: "transform",
            props: props,
            //@ts-ignore TODO
            render: children => createElement(wrapper, { ...callOrGet(wrapperProps, props), children })
        }
    })
}

/**
 * A type that represents the intercept type.
 * It can either replace the component or transform the props before they are passed to the inner component.
 */
export type Intercept<P extends {}> = ReplaceIntercept<P> | TransformIntercept<P>

export interface TransformIntercept<P> {

    readonly type: "transform"
    readonly props: P
    readonly render?: ((children: ReactNode) => ReactNode) | undefined

}

export interface ReplaceIntercept<P> {

    readonly type: "replace"
    readonly element: ValueOrFactory<ReactNode, [ComponentType<P>]>

}

/**
 * A hoc that intercepts the props of a component.
 * @param intercept The intercept type.
 * @returns A new component.
 */
export function intercept<I extends {}, O extends {}>(intercept: (props: I) => Intercept<O>) {
    return (Component: ComponentType<O>) => {
        return (props: I) => {
            const result = intercept(props)
            if (result.type === "replace") {
                return createElement(Fragment, { children: callOrGet(result.element, Component) })
            }
            else {
                const children = <Component {...result.props} />
                if (result.render === undefined) {
                    return children
                }
                return result.render(children)
            }
        }
    }
}
