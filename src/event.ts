import { useEffect } from "react"
import { useDeepCompareConstant } from "./constant"

/**
 * Attaches an event listener to the window with no dependencies. Make sure the listener function is memoized.
 * @param window The window object.
 * @param type The event type.
 * @param listener The event listener.
 * @param options The event listener options.
 */
export function useEventOnce<K extends keyof WindowEventMap>(window: Window, type: K, listener: (ev: WindowEventMap[K]) => void, options?: boolean | AddEventListenerOptions | undefined) {
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
