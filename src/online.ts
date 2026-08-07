import { useBoolean } from "./boolean.js"
import { useEvent } from "./event.js"

/**
 * Tracks the online status of the browser.
 * @returns Whether the browser is online.
 */
export function useOnline() {
    const online = useBoolean(window.navigator.onLine)
    useEvent(window, "online", online.on)
    useEvent(window, "offline", online.off)
    return online.value
}
