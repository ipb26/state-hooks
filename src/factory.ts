import { DependencyList, useMemo } from "react"
import { DepsAreEqual, useCustomCompareMemo } from "use-custom-compare"
import { useDeepCompareMemo } from "./deep-compare"

export function useFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useMemo(() => factory(...deps), deps)
}
export function useCustomCompareFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareMemo(() => factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useDeepCompareMemo(() => factory(...deps), deps)
}
