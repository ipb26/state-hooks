import { useState } from "react"

/**
 * A hook that provides a counter.
 * @param start The initial value of the counter.
 * @returns An object that provides the current count and methods to manipulate it.
 */
export function useCounter(start = 0) {
    const [count, setCount] = useState(start)
    return {
        count,
        set: setCount,
        increment: () => setCount(count => count + 1),
        decrement: () => setCount(count => count - 1),
        reset: () => setCount(start),
    }
}
