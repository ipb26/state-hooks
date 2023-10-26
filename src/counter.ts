import { useState } from "react"

export function useCounter(start = 0) {
    const [count, setCount] = useState(start)
    return {
        count,
        increment: () => setCount(count => count + 1),
        decrement: () => setCount(count => count - 1),
        reset: () => setCount(start),
    }
}