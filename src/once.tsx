import { EffectCallback, useCallback, useEffect, useMemo } from "react"

/**
 * A shorthand for useCallback with an empty dependency array.
 * @param callback The callback function to memoize.
 * @returns The memoized callback.
 */
export function useCallbackOnce<T extends Function>(callback: T) {
    return useCallback(callback, [])
}

/**
 * A shorthand for useEffect with an empty dependency array.
 * @param effect The effect function to run.
 */
export function useEffectOnce(effect: EffectCallback) {
    useEffect(effect, [])
}

/**
 * A shorthand for useMemo with an empty dependency array.
 * @param factory The factory function to create the value.
 * @returns The memoized value.
 */
export function useMemoOnce<T>(factory: () => T) {
    return useMemo(factory, [])
}
