import { DependencyList, useCallback } from "react"
import { useCustomCompareCallback } from "./custom-compare"
import { useDeepCompareCallback } from "./deep-compare"
import { DepsAreEqual } from "./types"

export function useFactoryCallback<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useCallback(() => factory(...deps), deps)
}
export function useCustomCompareFactoryCallback<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareCallback(() => factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareFactoryCallback<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useDeepCompareCallback(() => factory(...deps), deps)
}
