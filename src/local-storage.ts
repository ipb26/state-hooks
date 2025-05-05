import { useCallback, useEffect, useMemo, useState } from "react"

interface StorageEvent {

    readonly key: string
    readonly newValue: string | undefined

}

const storageListeners = new Array<(event: StorageEvent) => void>()
storageListeners.push(event => {
    if (event.newValue === undefined) {
        window.localStorage.removeItem(event.key)
    }
    else {
        window.localStorage.setItem(event.key, event.newValue)
    }
})
window.addEventListener("storage", event => {
    storageListeners.forEach(listen => {
        if (event.key === null) {
            return
        }
        listen({
            key: event.key,
            newValue: event.newValue ?? undefined,
        })
    })
})

export function useLocalStorage(key: string) {
    const [value, setLocalValue] = useState(() => window.localStorage.getItem(key) ?? undefined)
    useEffect(() => {
        const listen = (event: StorageEvent) => {
            if (event.key === key) {
                setLocalValue(event.newValue)
            }
        }
        storageListeners.push(listen)
        return () => {
            storageListeners.splice(storageListeners.indexOf(listen))
        }
    }, [
        key
    ])
    const setValue = useCallback((newValue: string | undefined) => {
        storageListeners.forEach(listen => {
            listen({
                key,
                newValue,
            })
        })
    }, [
        key
    ])
    return [value, setValue] as const
}

export function useParsingLocalStorage<T>(key: string, stringify: (value: T) => string = JSON.stringify, parse: (data: string) => T = data => JSON.parse(data) as T) {
    const [value, setValue] = useLocalStorage(key)
    const parsedValue = useMemo(() => {
        return value === undefined ? undefined : parse(value)
    }, [
        value
    ])
    const setParsedValue = useCallback((newValue: T) => {
        return setValue(newValue === undefined ? undefined : stringify(newValue))
    }, [
        setValue
    ])
    return [
        parsedValue,
        setParsedValue
    ] as const
    /*
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
                setRawValue(event.newValue === undefined ? undefined : parse(event.newValue))
            }
        }
        storageListeners.push(listen)
        return () => {
            storageListeners.splice(storageListeners.indexOf(listen))
        }
    }, [
        key
    ])
    const setValue = useCallback((newValueRaw: T | undefined) => {
        const newValue = newValueRaw === undefined ? undefined : stringify(newValueRaw)
        storageListeners.forEach(listen => {
            listen({
                key,
                newValue,
            })
        })
    }, [
        key
    ])
    return [value, setValue] as const*/
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