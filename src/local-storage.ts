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
    const setValue = useCallback((newValue: string | undefined) => {
        if (newValue === undefined) {
            window.localStorage.removeItem(key)
        }
        else {
            window.localStorage.setItem(key, newValue)
        }
        window.dispatchEvent(new StorageEvent("storage", {
            storageArea: window.localStorage,
            key,
            oldValue: value ?? null,
            newValue: newValue ?? null,
        }))
    }, [
        key
    ])
    return [value, setValue] as const
}
