import { useBoolean } from "./boolean.js";
import { useEvent } from "./event.js";

export function useVisibility() {
    const visible = useBoolean(document.visibilityState === "visible")
    useEvent(document, "visibilitychange", () => {
        visible.set(document.visibilityState === "visible")
    })
    return visible.value
}
