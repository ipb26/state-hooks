import { useBoolean } from "./boolean"
import { useEvent } from "./event"

export function useOnline() {
    const online = useBoolean(window.navigator.onLine)
    useEvent(window, "online", online.on)
    useEvent(window, "offline", online.off)
    return online.value
}
