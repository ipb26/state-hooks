import { DependencyList, EffectCallback, useCallback, useEffect, useMemo, useRef } from "react";
import { DepsAreEqual } from "./types";
import { useIsFirstMount } from "./updates";

export function useCustomCompareCallback<T extends Function, TDeps extends DependencyList>(callback: T, deps: TDeps, depsEqual: DepsAreEqual<TDeps>) {
    const ref = useRef<TDeps | undefined>(undefined)
    if (ref.current === undefined || !depsEqual(deps, ref.current)) {
        ref.current = deps
    }
    return useCallback(callback, ref.current)
}

export function useCustomCompareMemo<T, TDeps extends DependencyList>(factory: () => T, deps: TDeps, depsEqual: DepsAreEqual<TDeps>) {
    const ref = useRef<TDeps | undefined>(undefined)
    if (ref.current === undefined || !depsEqual(deps, ref.current)) {
        ref.current = deps
    }
    return useMemo(factory, ref.current)
}

export function useCustomCompareEffect<TDeps extends DependencyList>(effect: EffectCallback, deps: TDeps, depsEqual: DepsAreEqual<TDeps>) {
    const ref = useRef<TDeps | undefined>(undefined)
    if (ref.current === undefined || !depsEqual(deps, ref.current)) {
        ref.current = deps
    }
    return useEffect(effect, ref.current)
}

export function useCustomCompareUpdateEffect<D extends DependencyList>(effect: EffectCallback, deps: readonly [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    const firstMount = useIsFirstMount()
    return useCustomCompareEffect(() => {
        if (firstMount) {
            return
        }
        return effect()
    }, deps, depsAreEqual)
}
