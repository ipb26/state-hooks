import { useCustomCompareMemo } from "./custom-compare.js"
import { useDeepCompareMemo } from "./deep-compare.js"
import { DepsAreEqual } from "./types.js"

/**
 * Compares a value to its previous value. If unchanged, emits the previous value (so that it can be compared by reference by other hooks).
 */
export function useCustomCompareConstant<T>(value: T, depsAreEqual: DepsAreEqual<T>) {
    return useCustomCompareMemo(() => value, [value] as const, (a, b) => depsAreEqual(a[0], b[0]))
}

/**
 * Compares a value to its previous value. If unchanged, emits the previous value (so that it can be compared by reference by other hooks).
 */
export function useDeepCompareConstant<T>(value: T) {
    return useDeepCompareMemo(() => value, [value])
}
