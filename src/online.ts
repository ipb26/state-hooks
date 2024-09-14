import { useBoolean } from "./boolean"
import { useEventOnce } from "./event"

/**
 * Tracks the online status of the browser.
 * @returns Whether the browser is online.
 */
export function useOnline() {
    const online = useBoolean(window.navigator.onLine)
    useEventOnce(window, "online", online.on)
    useEventOnce(window, "offline", online.off)
    return online.value
}
