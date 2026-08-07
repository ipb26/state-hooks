import { useCallback, useState } from "react"
import { useUpdateEffect } from "./updates.js"

export function useCache<T>(func: () => T) {
    const [value, setCache] = useState<T>(func)
    useUpdateEffect(() => {
        setCache(func())
    }, [
        func
    ])
    const clear = useCallback(() => setCache(func()), [func])
    return {
        value,
        clear,
    }
}
