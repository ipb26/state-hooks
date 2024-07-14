import { useEffect } from "react"

export function useInterval(callback: () => void, interval: number) {
    useEffect(() => {
        const timer = setInterval(callback, interval)
        return () => {
            clearInterval(timer)
        }
    }, [
        interval,
        callback
    ])
}
