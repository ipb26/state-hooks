import { DependencyList, useCallback } from "react"
import { DepsAreEqual, useCustomCompareCallback } from "use-custom-compare"
import { useDeepCompareCallback } from "./deep-compare"

export function useFactoryCallback<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useCallback(() => factory(...deps), deps)
}
export function useCustomCompareFactoryCallback<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareCallback(() => factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareFactoryCallback<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useDeepCompareCallback(() => factory(...deps), deps)
}
