import { DependencyList, useCallback, useState } from "react"
import { useCounter } from "./counter"
import { useInterval } from "./interval"
import { useIsFirstMount } from "./updates"

/*
export interface SchedulerResult<T> {

    readonly first: boolean
    readonly count: number
    readonly value: T

}
*/
export function useScheduler<T>(interval: number | undefined, callback: (first: boolean) => T, deps: DependencyList) {
    const run = useCallback(callback, deps)
    const counter = useCounter()
    const [value, setLatest] = useState(() => run(true))
    const firstMount = useIsFirstMount()
    useInterval(interval, () => {
        if (firstMount) {
            return
        }
        const value = run(false)
        setLatest(value)
        counter.increment()
    }, [
        run,
        interval,
    ])
    return value
}

export function useSchedulerOnce<T>(interval: number | undefined, callback: (first: boolean) => T) {
    return useScheduler(interval, callback, [])
}
