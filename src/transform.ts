import { useCallback } from "react"
import { useFactory } from "./factory"

export function useTransform<I, O>(value: I, setValue: (value: I) => void, from: (data: I) => O, to: (value: O) => I) {
    const parsedValue = useFactory(from, [value])
    const setParsedValue = useCallback((newValue: O) => setValue(to(newValue)), [setValue])
    return [
        parsedValue,
        setParsedValue
    ] as const
}
