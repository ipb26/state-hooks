import { DependencyList, useEffect } from "react"
import { useCustomCompareConstant, useDeepCompareConstant } from "./constant"
import { DepsAreEqual } from "./types"

/**
 * Attaches an event listener to the window with no dependencies. Make sure the listener function is memoized.
 * @param window The window object.
 * @param type The event type.
 * @param listener The event listener.
 * @param options The event listener options.
 */
export function useWindowEventOnce<K extends keyof WindowEventMap>(type: K, listener: (ev: WindowEventMap[K]) => void, options?: boolean | AddEventListenerOptions | undefined) {
    useEffect(() => {
        window.addEventListener(type, listener, options)
        return () => {
            window.removeEventListener(type, listener)
        }
    }, [
        window,
        type,
    ])
}
export function useWindowEvent<K extends keyof WindowEventMap>(type: K, listener: (ev: WindowEventMap[K]) => void, deps: DependencyList, options?: boolean | AddEventListenerOptions | undefined) {
    useEffect(() => {
        window.addEventListener(type, listener, options)
        return () => {
            window.removeEventListener(type, listener)
        }
    }, [
        window,
        type,
        ...deps,
    ])
}
export function useCustomCompareWindowEvent<K extends keyof WindowEventMap, D extends DependencyList>(type: K, listener: (ev: WindowEventMap[K]) => void, deps: D, depsEqual: DepsAreEqual<D>, options?: boolean | AddEventListenerOptions | undefined) {
    useEffect(() => {
        window.addEventListener(type, listener, options)
        return () => {
            window.removeEventListener(type, listener)
        }
    }, [
        window,
        type,
        useCustomCompareConstant(deps, depsEqual)
    ])
}
export function useDeepCompareWindowEvent<K extends keyof WindowEventMap>(type: K, listener: (ev: WindowEventMap[K]) => void, deps: DependencyList, options?: boolean | AddEventListenerOptions | undefined) {
    useEffect(() => {
        window.addEventListener(type, listener, options)
        return () => {
            window.removeEventListener(type, listener)
        }
    }, [
        window,
        type,
        useDeepCompareConstant(deps)
    ])
}
