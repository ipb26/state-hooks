import { useBoolean } from "./boolean";
import { useDocumentEventOnce } from "./document-event";

export function useVisibility() {
    const visible = useBoolean(document.visibilityState === "visible")
    useDocumentEventOnce("visibilitychange", () => {
        visible.set(document.visibilityState === "visible")
    })
    return visible.value
}
