import { useEffect } from "react"
import { useDeepCompareConstant } from "./constant"

export function useEvent<K extends keyof WindowEventMap>(window: Window, type: K, listener: (ev: WindowEventMap[K]) => void, options?: boolean | AddEventListenerOptions) {
    useEffect(() => {
        window.addEventListener(type, listener, options)
        return () => {
            window.removeEventListener(type, listener)
        }
    }, [
        window,
        type,
        listener,
        useDeepCompareConstant(options),
    ])
}
