import { DependencyList, useCallback } from "react"
import { useCustomCompareCallback } from "./custom-compare"
import { useDeepCompareCallback } from "./deep-compare"
import { useCallbackOnce } from "./once"
import { useThrower } from "./thrower"
import { DepsAreEqual } from "./types"

export function useAsyncCallback<T extends (...args: any) => Promise<any>, D extends DependencyList>(callback: T, deps: [...D]) {
    const thrower = useThrower()
    return useCallback((...args: Parameters<T>) => {
        callback(...args).catch(thrower)
    }, deps)
}
export function useCustomCompareAsyncCallback<T extends (...args: any) => Promise<any>, D extends DependencyList>(callback: T, deps: [...D], depsAreEqual: DepsAreEqual<readonly [...D]>) {
    const thrower = useThrower()
    return useCustomCompareCallback((...args: Parameters<T>) => {
        callback(...args).catch(thrower)
    }, deps, depsAreEqual)
}
export function useDeepCompareAsyncCallback<T extends (...args: any) => Promise<any>, D extends DependencyList>(callback: T, deps: [...D]) {
    const thrower = useThrower()
    return useDeepCompareCallback((...args: Parameters<T>) => {
        callback(...args).catch(thrower)
    }, deps)
}
export function useAsyncCallbackOnce<T extends (...args: any) => Promise<any>>(callback: T) {
    const thrower = useThrower()
    return useCallbackOnce((...args: Parameters<T>) => {
        callback(...args).catch(thrower)
    })
}
