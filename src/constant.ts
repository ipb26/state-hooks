import { DepsAreEqual, useCustomCompareMemo } from "use-custom-compare"
import { useDeepCompareMemo } from "./deep-compare"

/**
 * Compares a value to its previous value. If unchanged, emits the previous value (so that it can be compared by reference by other hooks).
 */
export function useCustomCompareConstant<T>(value: T, depsAreEqual: DepsAreEqual<readonly [T]>) {
    return useCustomCompareMemo(() => value, [value], depsAreEqual)
}

/**
 * Compares a value to its previous value. If unchanged, emits the previous value (so that it can be compared by reference by other hooks).
 */
export function useDeepCompareConstant<T>(value: T) {
    return useDeepCompareMemo(() => value, [value])
}
