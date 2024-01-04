import { useState } from "react"
import { useCounter } from "./counter"
import { useThrower } from "./thrower"

export function useAsyncCallback<R, A extends readonly unknown[]>(func: (...args: A) => PromiseLike<R>) {
    const runs = useCounter()
    const [result, setResult] = useState<R>()
    const thrower = useThrower()
    return {
        isRunning: runs.count > 0,
        runningCount: runs.count,
        result,
        run: (...args: A) => {
            runs.increment()
            func(...args).then(result => {
                runs.decrement()
                setResult(result)
            }, e => {
                runs.decrement()
                thrower(e)
            })
        }
    }
}
