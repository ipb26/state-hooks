import { useBoolean } from "./boolean";
import { useEvent } from "./event";

export function useVisibility() {
    const visible = useBoolean(document.visibilityState === "visible")
    useEvent(document, "visibilitychange", () => {
        visible.set(document.visibilityState === "visible")
    })
    return visible.value
}
