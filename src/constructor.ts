import { DependencyList, useMemo } from "react"
import { DepsAreEqual, useCustomCompareMemo } from "use-custom-compare"
import { useDeepCompareMemo } from "./deep-compare"

export function useConstructor<T, D extends DependencyList>(factory: new (...args: D) => T, deps: [...D]) {
    return useMemo(() => new factory(...deps), deps)
}
export function useCustomCompareConstructor<T, D extends DependencyList>(factory: new (...args: D) => T, deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareMemo(() => new factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareConstructor<T, D extends DependencyList>(factory: new (...args: D) => T, deps: [...D]) {
    return useDeepCompareMemo(() => new factory(...deps), deps)
}
