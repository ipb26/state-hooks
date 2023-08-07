import { SetStateAction, useCallback, useEffect, useRef, useState } from "react"

export function useStatePromise<T>(initialValue: T) {
    const callbackRef = useRef<((value: T) => void) | null>(null)
    const [state, setState] = useState(initialValue)
    useEffect(() => {
        if (callbackRef.current) {
            callbackRef.current(state)
            callbackRef.current = null
        }
    }, [
        state
    ])
    const setStatePromise = useCallback(async (newValue: SetStateAction<T>) => {
        return new Promise<T>(resolve => {
            callbackRef.current = resolve
            setState(newValue)
        })
    }, [])
    return [state, setStatePromise] as const
}
