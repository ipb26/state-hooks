import { useCounter } from "./counter"

export function useAsyncCallback<R, A extends readonly unknown[]>(func: (...args: A) => PromiseLike<R>) {
    const runs = useCounter()
    return {
        isRunning: runs.count > 0,
        run: async (...args: A) => {
            runs.increment()
            try {
                await func(...args)
            }
            finally {
                runs.decrement()
            }
        }
    }
}
