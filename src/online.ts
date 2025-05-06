import { useBoolean } from "./boolean"
import { useWindowEventOnce } from "./window-event"

/**
 * Tracks the online status of the browser.
 * @returns Whether the browser is online.
 */
export function useOnline() {
    const online = useBoolean(window.navigator.onLine)
    useWindowEventOnce("online", online.on)
    useWindowEventOnce("offline", online.off)
    return online.value
}
