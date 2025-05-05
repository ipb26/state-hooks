import { useCallback, useEffect, useState } from "react"

interface StorageEvent {

    readonly key: string | null
    readonly newValue: string | null

}

const storageListeners = new Array<(event: StorageEvent) => void>()

export function useLocalStorage(key: string) {
    return useParsingLocalStorage<string>(key, value => value, value => value)
}

export function useParsingLocalStorage<T>(key: string, stringify: (value: T) => string = JSON.stringify, parse: (data: string) => T = data => JSON.parse(data) as T) {
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
        storageListeners.push(listen)
        window.addEventListener("storage", listen)
        return () => {
            storageListeners.splice(storageListeners.indexOf(listen), 1)
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

/*
const listeners = new Map<string, Array<(value: string | undefined) => void>>()

export function useGlobal(key: string) {
    const [value, setLocalValue] = useState<string>()
    useEffect(() => {
        const listener = (newValue: string | undefined) => setLocalValue(newValue)
        return () => {
            const keyListeners = listeners.get(key)
            if (keyListeners === undefined) {
                return
            }
            keyListeners.splice(keyListeners.indexOf(listener), 1)
        }
    }, [
        key
    ])
    const setValue = useCallback((newValue: string | undefined) => {
        listeners.forEach(callback => {
            callback(newValue)
        })
    }, [
        listeners
    ])
    return [
        value,
        setValue,
    ] as const
}
*/