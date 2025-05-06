import { DependencyList, useMemo } from "react";
import { useCustomCompareMemo } from "./custom-compare";
import { useDeepCompareMemo } from "./deep-compare";
import { useMemoOnce } from "./once";
import { useAt } from "./time";
import { DepsAreEqual } from "./types";

/**
 * Returns true after the specified delay has passed.
 * @param delay Delay.
 * @returns True or false.
 */
export function useDelayOnce(delay: number | undefined) {
    return useAt(useMemoOnce(() => delay === undefined ? undefined : Date.now() + delay))
}

/**
 * Returns true after the specified delay has passed since the dependencies have changed.
 * @param delay Delay.
 * @returns True or false.
 */
export function useDelay(delay: number | undefined, deps: DependencyList) {
    return useAt(useMemo(() => delay === undefined ? undefined : Date.now() + delay, deps))
}

/**
 * Returns true after the specified delay has passed since the dependencies have changed.
 * @param delay Delay.
 * @returns True or false.
 */
export function useDeepCompareDelay(delay: number | undefined, deps: DependencyList) {
    return useAt(useDeepCompareMemo(() => delay === undefined ? undefined : Date.now() + delay, deps))
}

/**
 * Returns true after the specified delay has passed since the dependencies have changed.
 * @param delay Delay.
 * @returns True or false.
 */
export function useCustomCompareDelay<D extends DependencyList>(delay: number | undefined, deps: D, depsEqual: DepsAreEqual<D>) {
    return useAt(useCustomCompareMemo(() => delay === undefined ? undefined : Date.now() + delay, deps, depsEqual))
}

/**
 * Returns true after the specified delay has passed since the delay time has changed.
 * @param delay Delay.
 * @returns True or false.
 */
export function useDelayBy(delay: number | undefined) {
    return useDelay(delay, [delay])
}
