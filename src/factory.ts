import { dequal } from "dequal"
import { DependencyList, useMemo } from "react"
import { DepsAreEqual, useCustomCompareMemo } from "use-custom-compare"

export function useFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useMemo(() => factory(...deps), deps)
}
export function useCustomCompareFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareMemo(() => factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useCustomCompareFactory(factory, deps, dequal)
}