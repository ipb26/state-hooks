import { DependencyList, EffectCallback, useRef } from "react"
import { DepsAreEqual, useCustomCompareEffect } from "use-custom-compare"

export { DepsAreEqual, useCustomCompareCallback, useCustomCompareEffect, useCustomCompareMemo } from "use-custom-compare"

export function useCustomCompareUpdateEffect<D extends DependencyList>(effect: EffectCallback, deps: readonly [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    const firstMount = useRef(true)
    useCustomCompareEffect(() => {
        if (firstMount.current) {
            firstMount.current = false
        }
        return effect()
    }, deps, depsAreEqual)
}
