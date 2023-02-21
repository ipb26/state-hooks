import { dequal } from "dequal"
import { DependencyList, useCallback } from "react"
import { DepsAreEqual, useCustomCompareCallback } from "use-custom-compare"

//TODO rename to:
//callback with args
//callbackwithparams?
export function useBound<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useCallback(() => factory(...deps), deps)
}
export function useCustomCompareBound<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareCallback(() => factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareBound<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useCustomCompareBound(factory, deps, dequal)
}
