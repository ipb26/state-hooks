import { DependencyList, EffectCallback, useCallback, useEffect, useMemo, useRef } from "react";
import { DepsAreEqual } from "./types";
import { useIsFirstMount } from "./updates";

export function useCustomCompareCallback<T extends Function, D extends DependencyList>(callback: T, deps: D, depsEqual: DepsAreEqual<D>) {
    const ref = useRef<D | undefined>(undefined)
    if (ref.current === undefined || !depsEqual(deps, ref.current)) {
        ref.current = deps
    }
    return useCallback(callback, ref.current)
}

export function useCustomCompareMemo<T, D extends DependencyList>(factory: () => T, deps: D, depsEqual: DepsAreEqual<D>) {
    const ref = useRef<D | undefined>(undefined)
    if (ref.current === undefined || !depsEqual(deps, ref.current)) {
        ref.current = deps
    }
    return useMemo(factory, ref.current)
}

export function useCustomCompareEffect<D extends DependencyList>(effect: EffectCallback, deps: D, depsEqual: DepsAreEqual<D>) {
    const ref = useRef<D | undefined>(undefined)
    if (ref.current === undefined || !depsEqual(deps, ref.current)) {
        ref.current = deps
    }
    return useEffect(effect, ref.current)
}

export function useCustomCompareUpdateEffect<D extends DependencyList>(effect: EffectCallback, deps: D, depsAreEqual: DepsAreEqual<D>) {
    const firstMount = useIsFirstMount()
    return useCustomCompareEffect(() => {
        if (firstMount) {
            return
        }
        return effect()
    }, deps, depsAreEqual)
}
