import { DependencyList, useMemo } from "react"
import { useCustomCompareMemo } from "./custom-compare"
import { useDeepCompareMemo } from "./deep-compare"
import { DepsAreEqual } from "./types"

export function useFactoryMemo<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useMemo(() => factory(...deps), deps)
}
export function useCustomCompareFactoryMemo<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareMemo(() => factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareFactoryMemo<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useDeepCompareMemo(() => factory(...deps), deps)
}
