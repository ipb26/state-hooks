import { useCallback } from "react"
import { ValueOrFactory, callOrGet } from "value-or-factory"
import { useCounter } from "./counter"
import { useThrower } from "./thrower"

/**
 * Returns an object that can be used to track async operations.
 * @returns An object that can be used to track async operations.
 */
export function useAsyncTracker() {
    const runs = useCounter()
    const thrower = useThrower()
    return {
        isRunning: runs.current > 0,
        runningCount: runs.current,
        run: useCallback((promise: ValueOrFactory<PromiseLike<unknown>>) => {
            runs.increment()
            return callOrGet(promise).then(() => {
                runs.decrement()
            }, e => {
                runs.decrement()
                thrower(e)
            })
        }, [
            runs.increment,
            runs.decrement,
            thrower,
        ])
    }
}
export function useAsyncCallback<R, A extends readonly unknown[]>(func: (...args: A) => PromiseLike<R>): AsyncCallback<A> {
    const tracker = useAsyncTracker()
    return {
        isRunning: tracker.isRunning,
        runningCount: tracker.runningCount,
        run: useCallback((...args: A) => tracker.run(() => func(...args)), [tracker.run, func])
    }
}

export interface AsyncCallback<A extends readonly unknown[]> {

    readonly isRunning: boolean
    readonly runningCount: number
    readonly run: (...args: A) => PromiseLike<void>

}
