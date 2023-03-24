import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export { useCustomCompareCallback, useCustomCompareMemo } from "use-custom-compare";

export type DepsAreEqual<TDependencyList extends DependencyList> = (prevDeps: TDependencyList, nextDeps: TDependencyList) => boolean

export function useCustomCompareEffect<TDeps extends DependencyList>(effect: EffectCallback,
    deps: TDeps,
    depsEqual: DepsAreEqual<TDeps>) {
    const ref = useRef<TDeps | undefined>(undefined)
    if (!ref.current || !depsEqual(deps, ref.current)) {
        ref.current = deps
    }
    useEffect(effect, ref.current)
}

export function useCustomCompareUpdateEffect<D extends DependencyList>(effect: EffectCallback, deps: readonly [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    const firstMount = useRef(true)
    useCustomCompareEffect(() => {
        if (firstMount.current) {
            firstMount.current = false
            return
        }
        return effect()
    }, deps, depsAreEqual)
}
