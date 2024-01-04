import { DependencyList, useEffect } from "react"
import { useCustomCompareEffect } from "./custom-compare"
import { useDeepCompareEffect } from "./deep-compare"
import { DepsAreEqual } from "./types"

export function useEffectWith<D extends DependencyList>(callback: (...args: D) => void | (() => void), deps: [...D]) {
    return useEffect(() => callback(...deps), deps)
}
export function useCustomCompareEffectWith<D extends DependencyList>(callback: (...args: D) => void | (() => void), deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    return useCustomCompareEffect(() => callback(...deps), deps, depsAreEqual)
}
export function useDeepCompareEffectWith<D extends DependencyList>(callback: (...args: D) => void | (() => void), deps: [...D]) {
    return useDeepCompareEffect(() => callback(...deps), deps)
}
