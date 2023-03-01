import { useCallback, useState } from "react"

/**
 * Returns a boolean state object.
 * @param initialValue An initial boolean value.
 * @returns A boolean state object.
 */
export function useBoolean(initialValue = false) {
    const [value, set] = useState(initialValue)
    const on = useCallback(() => set(true), [])
    const off = useCallback(() => set(false), [])
    const toggle = useCallback(() => set(state => !state), [])
    return { value, on, off, toggle, set }
}
