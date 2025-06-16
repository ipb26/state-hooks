import { useCallback, useEffect, useState } from "react"

export function useLocalStorage(key: string) {
    const [value, setLocalValue] = useState(() => window.localStorage.getItem(key) ?? undefined)
    useEffect(() => {
        const listen = (event: StorageEvent) => {
            if (event.key === key) {
                setLocalValue(event.newValue ?? undefined)
            }
        }
        window.addEventListener("storage", listen)
        return () => {
            window.removeEventListener("storage", listen)
        }
    }, [
        key
    ])
    const setValue = useCallback((action: string | undefined | ((oldValue: string | undefined) => string | undefined)) => {
        const oldValue = window.localStorage.getItem(key)
        const newValue = typeof action === "function" ? action(oldValue ?? undefined) ?? null : action ?? null
        if (newValue === null) {
            window.localStorage.removeItem(key)
        }
        else {
            window.localStorage.setItem(key, newValue)
        }
        window.dispatchEvent(new StorageEvent("storage", {
            storageArea: window.localStorage,
            key,
            oldValue,
            newValue,
        }))
    }, [
        key
    ])
    return [value, setValue] as const
}
