import { EffectCallback, useCallback, useEffect, useMemo } from "react"
import { useConstructorWithCleanup } from "./constructor-cleanup"

export function useCallbackOnce<T extends Function>(callback: T) {
    return useCallback(callback, [])
}
export function useEffectOnce(effect: EffectCallback) {
    return useEffect(effect, [])
}
export function useMemoOnce<T>(factory: () => T) {
    return useMemo(factory, [])
}
export function useMemoOnceWithCleanup<T>(factory: () => T, cleanup: (value: T) => void) {
    const value = useMemoOnce(factory)
    useEffect(() => () => cleanup(value), [value])
    return value
}
export function useConstructorOnceWithCleanup<T,>(factory: new () => T, cleanup: (value: T) => void) {
    return useConstructorWithCleanup(factory, cleanup, [])
}