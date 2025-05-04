import { useCallback, useEffect, useState } from "react"

//TODO use some kind of global for this
export function useLocalStorage<T>(key: string, stringify: (value: T) => string = JSON.stringify, parse: (data: string) => T = data => JSON.parse(data) as T) {
    const [value, setRawValue] = useState(() => {
        const current = window.localStorage.getItem(key)
        if (current === null) {
            return
        }
        return parse(current)
    })
    useEffect(() => {
        const listen = (event: StorageEvent) => {
            if (event.key === key) {
                setValue(event.newValue === null ? undefined : parse(event.newValue))
            }
        }
        window.addEventListener("storage", listen)
        return () => {
            window.removeEventListener("storage", listen)
        }
    }, [
        key
    ])
    const setValue = useCallback((newValue: T | undefined) => {
        setRawValue(newValue)
        const stringified = newValue === undefined ? undefined : stringify(newValue)
        if (stringified === undefined) {
            window.localStorage.removeItem(key)
        }
        else {
            window.localStorage.setItem(key, stringified)
        }
    }, [
        key
    ])
    const clearValue = useCallback(() => {
        setValue(undefined)
        window.localStorage.removeItem(key)
    }, [
        key
    ])
    return [value, setValue, clearValue] as const
}
