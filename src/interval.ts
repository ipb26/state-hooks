import { useEffect, useState } from "react"

//TODO will this even work reliably?
export function useEvery(interval: number | undefined) {
    const [reached, setReached] = useState(false)
    useEffect(() => {
        if (interval === undefined) {
            return
        }
        const timeout = setTimeout(setReached.bind(null, true), interval)
        return () => {
            return clearTimeout(timeout)
        }
    }, [
        interval
    ])
    useEffect(() => {
        if (reached) {
            setReached(false)
        }
    }, [
        reached
    ])
    return reached
}

/*
export function useInterval(interval: number | undefined, callback: () => void, deps: DependencyList) {
    useEffect(() => {
        if (interval === undefined || interval <= 0) {
            return
        }
        const timer = setInterval(callback, interval)
        return () => {
            clearInterval(timer)
        }
    }, [
        interval,
        deps
    ])
}
export function useCustomCompareInterval<D extends DependencyList>(interval: number | undefined, callback: () => void, deps: D, depsAreEqual: DepsAreEqual<D>) {
    useCustomCompareEffect<D>(() => {
        if (interval === undefined || interval <= 0) {
            return
        }
        const timer = setInterval(callback, interval)
        return () => {
            clearInterval(timer)
        }
    }, [
        interval,
        ...deps
    ], depsAreEqual)
}
export function useDeepCompareInterval(interval: number | undefined, callback: () => void, deps: DependencyList) {
    useDeepCompareEffect(() => {
        if (interval === undefined || interval <= 0) {
            return
        }
        const timer = setInterval(callback, interval)
        return () => {
            clearInterval(timer)
        }
    }, [
        interval,
        deps
    ])
}

export function useIntervalOnce(interval: number | undefined, callback: () => void) {
    useEffect(() => {
        if (interval === undefined || interval === 0) {
            return
        }
        const timer = setInterval(callback, interval)
        return () => {
            clearInterval(timer)
        }
    }, [
        interval
    ])
}
*/