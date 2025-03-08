import { DependencyList, useEffect } from "react"

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
