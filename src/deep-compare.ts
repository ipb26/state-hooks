import { dequal } from "dequal"
import { DependencyList, EffectCallback } from "react"
import { useCustomCompareCallback, useCustomCompareEffect, useCustomCompareMemo } from "use-custom-compare"
import { useCustomCompareUpdateEffect } from "./custom-compare"

export function useDeepCompareEffect<D extends DependencyList>(effect: EffectCallback, deps: [...D]) {
    return useCustomCompareEffect(effect, deps, dequal)
}
export function useDeepCompareUpdateEffect<D extends DependencyList>(effect: EffectCallback, deps: [...D]) {
    return useCustomCompareUpdateEffect(effect, deps, dequal)
}
export function useDeepCompareCallback<T extends (...args: any[]) => any, D extends DependencyList>(callback: T, deps: [...D]) {
    return useCustomCompareCallback(callback, deps, dequal)
}
export function useDeepCompareMemo<T, D extends DependencyList>(factory: () => T, deps: [...D]) {
    return useCustomCompareMemo(factory, deps, dequal)
}
