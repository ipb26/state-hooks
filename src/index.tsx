import { dequal } from "dequal"
import { DependencyList, EffectCallback, useEffect, useMemo, useRef, useState } from "react"
import { DepsAreEqual, useCustomCompareCallback, useCustomCompareEffect, useCustomCompareMemo } from "use-custom-compare"

export function useSyncState<T>(inputValue: T, setInputValue?: ((value: T) => void)) {
    const [value, setValue] = useState(inputValue)
    useEffect(() => setValue(inputValue), [inputValue])
    return [value, setInputValue ?? setValue] as const
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
export function useCustomCompareAutoCleanupMemo<T, D extends DependencyList>(factory: (...args: D) => T, cleanup: (value: T) => void, deps: D, depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareCleanupMemo(() => factory(...deps), cleanup, deps, depsAreEqual)
}
export function useDeepCompareAutoCleanupMemo<T, D extends DependencyList>(factory: (...args: D) => T, cleanup: (value: T) => void, deps: D) {
    return useCustomCompareAutoCleanupMemo(factory, cleanup, deps, dequal)
}
export function useCustomCompareAutoMemo<T, D extends DependencyList>(factory: (...args: D) => T, deps: D, depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareMemo(() => factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareAutoMemo<T, D extends DependencyList>(factory: (...args: D) => T, deps: D) {
    return useCustomCompareAutoMemo(factory, deps, dequal)
}
export function useCleanupMemo<T, D extends DependencyList>(factory: () => T, cleanup: (value: T) => void, deps: D) {
    const value = useMemo(factory, deps)
    useEffect(() => () => cleanup(value), [value])
    return value
}
export function useDeepCompareCleanupMemo<T, D extends DependencyList>(factory: () => T, cleanup: (value: T) => void, deps: D) {
    const value = useDeepCompareMemo(factory, deps)
    useEffect(() => () => cleanup(value), [value])
    return value
}
export function useCustomCompareCleanupMemo<T, D extends DependencyList>(factory: () => T, cleanup: (value: T) => void, deps: D, depsAreEqual: DepsAreEqual<readonly [...D]>) {
    const value = useCustomCompareMemo(factory, deps, depsAreEqual)
    useEffect(() => () => cleanup(value), [value])
    return value
}

export { DepsAreEqual, useCustomCompareCallback, useCustomCompareEffect, useCustomCompareMemo } from "use-custom-compare"
