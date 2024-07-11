import { useEffect } from "react";
import { useBoolean } from "./boolean";
import { useUpdateEffect } from "./updates";

export function useAt(time: number) {
    const passed = useBoolean(time <= Date.now())
    const until = time - Date.now()
    useUpdateEffect(() => {
        passed.set(until <= 0)
    }, [
        until
    ])
    const at = until <= 2147483647 ? until : 0
    useEffect(() => {
        if (at <= 0) {
            return
        }
        const timeout = setTimeout(passed.on, at)
        return () => {
            clearTimeout(timeout)
        }
    }, [
        at
    ])
    return passed.value
}
