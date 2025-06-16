import { DependencyList, useEffect } from "react"
import { useCustomCompareEffect } from "./custom-compare"
import { useDeepCompareEffect } from "./deep-compare"
import { DepsAreEqual } from "./types"

/**
 * An effect that passes its dependencies to the callback.
 * @param callback The callback.
 * @param deps The dependencies.
 */
export function useEffectWith<D extends DependencyList>(callback: undefined | ((...args: D) => void) | (() => void), deps: [...D]) {
    useEffect(() => callback?.(...deps), deps)
}

/**
 * An effect that passes its dependencies to the callback.
 * @param callback The callback.
 * @param deps The dependencies.
 */
export function useCustomCompareEffectWith<D extends DependencyList>(callback: undefined | ((...args: D) => void) | (() => void), deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    useCustomCompareEffect(() => callback?.(...deps), deps, depsAreEqual)
}

/**
 * An effect that passes its dependencies to the callback.
 * @param callback The callback.
 * @param deps The dependencies.
 */
export function useDeepCompareEffectWith<D extends DependencyList>(callback: undefined | ((...args: D) => void) | (() => void), deps: [...D]) {
    useDeepCompareEffect(() => callback?.(...deps), deps)
}
