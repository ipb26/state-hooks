import { DependencyList } from "react"
import { useCustomCompareMemoWithCleanup, useDeepCompareMemoWithCleanup, useMemoWithCleanup } from "./cleanup"
import { DepsAreEqual } from "./types"

export function useConstructorWithCleanup<T, D extends DependencyList>(factory: new (...args: D) => T, cleanup: (value: T) => void, deps: [...D]) {
    return useMemoWithCleanup(() => new factory(...deps), cleanup, deps)
}
export function useCustomCompareConstructorWithCleanup<T, D extends DependencyList>(factory: new (...args: D) => T, cleanup: (value: T) => void, deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareMemoWithCleanup(() => new factory(...deps), cleanup, deps, depsAreEqual)
}
export function useDeepCompareConstructorWithCleanup<T, D extends DependencyList>(factory: new (...args: D) => T, cleanup: (value: T) => void, deps: [...D]) {
    return useDeepCompareMemoWithCleanup(() => new factory(...deps), cleanup, deps)
}
