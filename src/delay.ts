import { DependencyList, useMemo } from "react";
import { useCustomCompareMemo } from "./custom-compare";
import { useDeepCompareMemo } from "./deep-compare";
import { useMemoOnce } from "./once";
import { useAt } from "./time";
import { DepsAreEqual } from "./types";

export function useDelayOnce(delay: number | undefined) {
    return useAt(useMemoOnce(() => delay === undefined ? undefined : Date.now() + delay))
}
export function useDelay(delay: number | undefined, deps: DependencyList) {
    return useAt(useMemo(() => delay === undefined ? undefined : Date.now() + delay, deps))
}
export function useDeepCompareDelay(delay: number | undefined, deps: DependencyList) {
    return useAt(useDeepCompareMemo(() => delay === undefined ? undefined : Date.now() + delay, deps))
}
export function useCustomCompareDelay<D extends DependencyList>(delay: number | undefined, deps: D, depsEqual: DepsAreEqual<D>) {
    return useAt(useCustomCompareMemo(() => delay === undefined ? undefined : Date.now() + delay, deps, depsEqual))
}
