import { DependencyList } from "react"
import { useCustomCompareMemoWithCleanup, useDeepCompareMemoWithCleanup, useMemoWithCleanup } from "./cleanup"
import { DepsAreEqual } from "./types"

export function useFactoryWithCleanup<T, D extends DependencyList>(factory: (...args: D) => T, cleanup: (value: T) => void, deps: [...D]) {
    return useMemoWithCleanup(() => factory(...deps), cleanup, deps)
}
export function useCustomCompareFactoryWithCleanup<T, D extends DependencyList>(factory: (...args: D) => T, cleanup: (value: T) => void, deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareMemoWithCleanup(() => factory(...deps), cleanup, deps, depsAreEqual)
}
export function useDeepCompareFactoryWithCleanup<T, D extends DependencyList>(factory: (...args: D) => T, cleanup: (value: T) => void, deps: [...D]) {
    return useDeepCompareMemoWithCleanup(() => factory(...deps), cleanup, deps)
}