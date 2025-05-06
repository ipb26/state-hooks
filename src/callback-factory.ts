import { DependencyList, useCallback } from "react"
import { useCustomCompareCallback } from "./custom-compare"
import { useDeepCompareCallback } from "./deep-compare"
import { DepsAreEqual } from "./types"

export function useCallbackFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useCallback(() => factory(...deps), deps)
}
export function useCustomCompareCallbackFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareCallback(() => factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareCallbackFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useDeepCompareCallback(() => factory(...deps), deps)
}
