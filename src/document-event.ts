import { DependencyList, useEffect } from "react"
import { useCustomCompareConstant, useDeepCompareConstant } from "./constant"
import { DepsAreEqual } from "./types"

/**
 * Attaches an event listener to the document with no dependencies. Make sure the listener function is memoized.
 * @param document The document object.
 * @param type The event type.
 * @param listener The event listener.
 * @param options The event listener options.
 */
export function useDocumentEventOnce<K extends keyof DocumentEventMap>(type: K, listener: (ev: DocumentEventMap[K]) => void, options?: boolean | AddEventListenerOptions | undefined) {
    useEffect(() => {
        document.addEventListener(type, listener, options)
        return () => {
            document.removeEventListener(type, listener)
        }
    }, [
        document,
        type,
    ])
}
export function useDocumentEvent<K extends keyof DocumentEventMap>(type: K, listener: (ev: DocumentEventMap[K]) => void, deps: DependencyList, options?: boolean | AddEventListenerOptions | undefined) {
    useEffect(() => {
        document.addEventListener(type, listener, options)
        return () => {
            document.removeEventListener(type, listener)
        }
    }, [
        document,
        type,
        ...deps,
    ])
}
export function useCustomCompareDocumentEvent<K extends keyof DocumentEventMap, D extends DependencyList>(type: K, listener: (ev: DocumentEventMap[K]) => void, deps: D, depsEqual: DepsAreEqual<D>, options?: boolean | AddEventListenerOptions | undefined) {
    useEffect(() => {
        document.addEventListener(type, listener, options)
        return () => {
            document.removeEventListener(type, listener)
        }
    }, [
        document,
        type,
        useCustomCompareConstant(deps, depsEqual)
    ])
}
export function useDeepCompareDocumentEvent<K extends keyof DocumentEventMap>(type: K, listener: (ev: DocumentEventMap[K]) => void, deps: DependencyList, options?: boolean | AddEventListenerOptions | undefined) {
    useEffect(() => {
        document.addEventListener(type, listener, options)
        return () => {
            document.removeEventListener(type, listener)
        }
    }, [
        document,
        type,
        useDeepCompareConstant(deps)
    ])
}
