import { DependencyList, useEffect } from "react"
import { useArray } from "./array"
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

export interface EventTarget<E> {

    addEventListener(type: string, listener: ((evt: E) => void), options?: boolean | AddEventListenerOptions): void
    removeEventListener(type: string, listener: ((evt: E) => void), options?: EventListenerOptions | boolean): void

}

//TODO rm above

export function useEvent<T>(target: EventTarget<T>, type: string, listener: (event: T) => void, options?: EventListenerOptions | undefined) {
    const events = useArray<T>()
    useEffect(() => {
        const listener = events.append
        target.addEventListener(type, listener, options)
        return () => {
            target.removeEventListener(type, listener)
        }
    }, [
        events,
        target,
        type,
        useDeepCompareConstant(options),
    ])
    useEffect(() => {
        events.value.forEach(listener)
    }, [
        events.value
    ])
}

/*
export function fromEvent<T>(target: HasEventTargetAddRemove<T> | ArrayLike<HasEventTargetAddRemove<T>>, eventName: string): Observable<T>;
export function fromEvent<T, R>(
    target: HasEventTargetAddRemove<T> | ArrayLike<HasEventTargetAddRemove<T>>,
    eventName: string,
    resultSelector: (event: T) => R
): Observable<R>;
export function fromEvent<T>(
    target: HasEventTargetAddRemove<T> | ArrayLike<HasEventTargetAddRemove<T>>,
    eventName: string,
    options: EventListenerOptions
): Observable<T>;
export function fromEvent<T, R>(
    target: HasEventTargetAddRemove<T> | ArrayLike<HasEventTargetAddRemove<T>>,
    eventName: string,
    options: EventListenerOptions,
    resultSelector: (event: T) => R
): Observable<R>;*/