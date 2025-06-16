import { useCallback, useState } from "react"

/**
 * A hook that provides a counter.
 * @param start The initial value of the counter.
 * @returns An object that provides the current count and methods to manipulate it.
 */
export function useCounter(start = 0) {
    const [current, set] = useState(start)
    return {
        current,
        set,
        increment: useCallback(() => set(count => count + 1), [set]),
        decrement: useCallback(() => set(count => count - 1), [set]),
        reset: useCallback(() => set(start), [set]),
    }
}
