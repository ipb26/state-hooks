import { useState } from "react"
import { useCallbackOnce } from "."

/**
 * Returns a boolean state object.
 * @param initialValue An initial boolean value.
 * @returns A boolean state object.
 */
export function useBoolean(initialValue = false) {
    const [value, set] = useState(initialValue)
    const on = useCallbackOnce(() => set(true))
    const off = useCallbackOnce(() => set(false))
    const toggle = useCallbackOnce(() => set(state => !state))
    return { value, on, off, toggle, set }
}
