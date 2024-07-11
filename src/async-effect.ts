import { DependencyList, useEffect } from "react"
import { DepsAreEqual, useCustomCompareEffect, useCustomCompareUpdateEffect, useDeepCompareEffect, useEffectOnce, useThrower, useUpdateEffect } from "."

export type AsyncEffectCallback = () => PromiseLike<void>

export function useAsyncEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: [...D]) {
    const thrower = useThrower()
    useEffect(() => {
        callback().then(() => void 0, thrower)
    }, deps)
}

export function useAsyncUpdateEffect(callback: AsyncEffectCallback) {
    const thrower = useThrower()
    useUpdateEffect(() => {
        callback().then(() => void 0, thrower)
    })
}
export function useAsyncEffectOnce(callback: AsyncEffectCallback) {
    const thrower = useThrower()
    useEffectOnce(() => {
        callback().then(() => void 0, thrower)
    })
}

export function useCustomCompareAsyncEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: [...D], depsEqual: DepsAreEqual<D>) {
    const thrower = useThrower()
    useCustomCompareEffect(() => {
        callback().then(() => void 0, thrower)
    }, deps, depsEqual)
}

export function useCustomCompareAsyncUpdateEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: [...D], depsEqual: DepsAreEqual<D>) {
    const thrower = useThrower()
    useCustomCompareUpdateEffect(() => {
        callback().then(() => void 0, thrower)
    }, deps, depsEqual)
}

export function useDeepCompareAsyncEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: [...D]) {
    const thrower = useThrower()
    useDeepCompareEffect(() => {
        callback().then(() => void 0, thrower)
    }, deps)
}
