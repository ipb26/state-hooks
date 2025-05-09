import { useCustomCompareMemo } from "./custom-compare"
import { useDeepCompareMemo } from "./deep-compare"
import { DepsAreEqual } from "./types"

/**
 * Compares a value to its previous value. If unchanged, emits the previous value (so that it can be compared by reference by other hooks).
 */
export function useCustomCompareConstant<T>(value: T, depsAreEqual: DepsAreEqual<T>) {
    return useCustomCompareMemo(() => value, [value], (a, b) => depsAreEqual(a[0]!, b[0]!))//TODO hack
}

/**
 * Compares a value to its previous value. If unchanged, emits the previous value (so that it can be compared by reference by other hooks).
 */
export function useDeepCompareConstant<T>(value: T) {
    return useDeepCompareMemo(() => value, [value])
}
