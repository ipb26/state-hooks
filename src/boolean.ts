import { useCallback, useState } from "react"

/**
 * A boolean hook that provides convenience methods.
 */
export const useBoolean = (initialValue: boolean) => {
    const [value, set] = useState(initialValue)
    const on = useCallback(() => set(true), [])
    const off = useCallback(() => set(false), [])
    const toggle = useCallback(() => set(state => !state), [])
    return [value, on, off, toggle, set] as const
}
