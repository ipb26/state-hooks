import { DependencyList, useEffect, useMemo } from "react"
import { useCustomCompareMemo } from "./custom-compare"
import { useDeepCompareMemo } from "./deep-compare"
import { DepsAreEqual } from "./types"

/**
 * Memoizes a value and allows you to pass a cleanup function for convenience. The cleanup function is executed if the value changes.
 * @param factory Function that generates a value.
 * @param cleanup A cleanup function.
 * @param deps A list of dependencies.
 * @returns A generated value.
 */
export function useMemoWithCleanup<T, D extends DependencyList>(factory: () => T, cleanup: (value: T) => void, deps: [...D]) {
    const value = useMemo(factory, deps)
    useEffect(() => () => cleanup(value), [value])
    return value
}

/**
 * Memoizes a value and allows you to pass a cleanup function for convenience. The cleanup function is executed if the value changes.
 * @param factory Function that generates a value.
 * @param cleanup A cleanup function.
 * @param deps A list of dependencies.
 * @param depsAreEqual A custom dependency comparison function.
 * @returns A generated value.
 */
export function useCustomCompareMemoWithCleanup<T, D extends DependencyList>(factory: () => T, cleanup: (value: T) => void, deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    const value = useCustomCompareMemo(factory, deps, depsAreEqual)
    useEffect(() => () => cleanup(value), [value])
    return value
}

/**
 * Memoizes a value and allows you to pass a cleanup function for convenience. The cleanup function is executed if the value changes.
 * @param factory Function that generates a value.
 * @param cleanup A cleanup function.
 * @param deps A list of dependencies.
 * @returns A generated value.
 */
export function useDeepCompareMemoWithCleanup<T, D extends DependencyList>(factory: () => T, cleanup: (value: T) => void, deps: [...D]) {
    const value = useDeepCompareMemo(factory, deps)
    useEffect(() => () => cleanup(value), [value])
    return value
}
