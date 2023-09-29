import { EffectCallback, useCallback, useEffect, useMemo } from "react"

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
