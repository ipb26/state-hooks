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
        isRunning: runs.count > 0,
        runningCount: runs.count,
        run: (promise: ValueOrFactory<PromiseLike<unknown>>) => {
            runs.increment()
            callOrGet(promise).then(() => {
                runs.decrement()
            }, e => {
                runs.decrement()
                thrower(e)
            })
        }
    }
}
export function useTrackingAsyncCallback<R, A extends readonly unknown[]>(func: (...args: A) => PromiseLike<R>) {
    const tracker = useAsyncTracker()
    return {
        isRunning: tracker.isRunning,
        runningCount: tracker.runningCount,
        run: useCallback((...args: A) => tracker.run(() => func(...args)), [func])
    }
}

//TODO rm?
export function useAsyncCallback<R, A extends readonly unknown[]>(func: (...args: A) => PromiseLike<R>) {
    const tracker = useAsyncTracker()
    return {
        isRunning: tracker.isRunning,
        runningCount: tracker.runningCount,
        run: (...args: A) => tracker.run(() => func(...args))
    }
}
