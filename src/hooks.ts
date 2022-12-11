import { dequal } from "dequal"
import { DependencyList, EffectCallback, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { DepsAreEqual, useCustomCompareCallback, useCustomCompareEffect, useCustomCompareMemo } from "use-custom-compare"

//TODO rename
export function useSyncState<T>(inputValue: T, setInputValue?: ((value: T) => void)) {
    const [value, setValue] = useState(inputValue)
    useEffect(() => setValue(inputValue), [inputValue])
    return [value, setInputValue ?? setValue] as const
}

/**
 * A boolean hook that provides convenience methods.
 */
export const useBoolean = (initialValue: boolean) => {
    const [value, set] = useState(initialValue)
    const on = useCallback(() => set(true), [])
    const off = useCallback(() => set(false), [])
    const toggle = useCallback(() => set(state => !state), [])
    return [value, on, off, toggle, set] as const
}

export function useCustomCompareUpdateEffect<D extends DependencyList>(effect: EffectCallback, deps: readonly [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    const firstMount = useRef(true)
    useCustomCompareEffect(() => {
        if (firstMount.current) {
            firstMount.current = false
        }
        return effect()
    }, deps, depsAreEqual)
}

export function useDeepCompareEffect<D extends DependencyList>(effect: EffectCallback, deps: D) {
    return useCustomCompareEffect(effect, deps, dequal)
}
export function useDeepCompareUpdateEffect<D extends DependencyList>(effect: EffectCallback, deps: D) {
    return useCustomCompareUpdateEffect(effect, deps, dequal)
}
export function useDeepCompareCallback<T, D extends DependencyList>(callback: () => T, deps: D) {
    return useCustomCompareCallback(callback, deps, dequal)
}
export function useDeepCompareMemo<T, D extends DependencyList>(factory: () => T, deps: D) {
    return useCustomCompareMemo(factory, deps, dequal)
}
export function useCustomCompareFactoryWithCleanup<T, D extends DependencyList>(factory: (...args: D) => T, cleanup: (value: T) => void, deps: D, depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareMemoWithCleanup(() => factory(...deps), cleanup, deps, depsAreEqual)
}
export function useDeepCompareFactoryWithCleanup<T, D extends DependencyList>(factory: (...args: D) => T, cleanup: (value: T) => void, deps: D) {
    return useCustomCompareFactoryWithCleanup(factory, cleanup, deps, dequal)
}
export function useCustomCompareFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: D, depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareMemo(() => factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: D) {
    return useCustomCompareFactory(factory, deps, dequal)
}
export function useMemoWithCleanup<T, D extends DependencyList>(factory: () => T, cleanup: (value: T) => void, deps: D) {
    const value = useMemo(factory, deps)
    useEffect(() => () => cleanup(value), [value])
    return value
}
export function useDeepCompareMemoWithCleanup<T, D extends DependencyList>(factory: () => T, cleanup: (value: T) => void, deps: D) {
    const value = useDeepCompareMemo(factory, deps)
    useEffect(() => () => cleanup(value), [value])
    return value
}
export function useCustomCompareMemoWithCleanup<T, D extends DependencyList>(factory: () => T, cleanup: (value: T) => void, deps: D, depsAreEqual: DepsAreEqual<readonly [...D]>) {
    const value = useCustomCompareMemo(factory, deps, depsAreEqual)
    useEffect(() => () => cleanup(value), [value])
    return value
}

export { DepsAreEqual, useCustomCompareCallback, useCustomCompareEffect, useCustomCompareMemo } from "use-custom-compare"
