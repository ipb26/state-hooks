import { DependencyList, useCallback, useMemo } from "react"
import { useCustomCompareCallback, useCustomCompareMemo } from "./custom-compare"
import { useDeepCompareCallback, useDeepCompareMemo } from "./deep-compare"
import { useCallbackOnce, useMemoOnce } from "./once"
import { DepsAreEqual } from "./types"

export function useConstructorOnce<T>(factory: new () => T) {
    return useMemoOnce(() => new factory())
}
export function useConstructor<T, D extends DependencyList>(factory: new (...args: D) => T, deps: [...D]) {
    return useMemo(() => new factory(...deps), deps)
}
export function useCustomCompareConstructor<T, D extends DependencyList>(factory: new (...args: D) => T, deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareMemo(() => new factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareConstructor<T, D extends DependencyList>(factory: new (...args: D) => T, deps: [...D]) {
    return useDeepCompareMemo(() => new factory(...deps), deps)
}
