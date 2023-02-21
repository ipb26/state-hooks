import { dequal } from "dequal"
import { useState } from "react"
import { useCustomCompareEffect } from "use-custom-compare"

export function useSyncState<T>(inputValue: T, setInputValue?: ((value: T) => void)) {
    return useCustomCompareSyncState(inputValue, setInputValue, (a, b) => a === b)
}
export function useDeepCompareSyncState<T>(inputValue: T, setInputValue?: ((value: T) => void)) {
    return useCustomCompareSyncState(inputValue, setInputValue, dequal)
}
export function useCustomCompareSyncState<T>(inputValue: T, setInputValue: ((value: T) => void) | undefined, compare: (a: T, b: T) => boolean) {
    const [value, setValue] = useState(inputValue)
    useCustomCompareEffect(() => {
        if (setInputValue === undefined) {
            setValue(inputValue)
        }
    }, [inputValue], (a, b) => compare(a[0], b[0]))
    return [setInputValue !== undefined ? inputValue : value, setInputValue !== undefined ? setInputValue : setValue] as const
}
