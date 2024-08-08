import { useEffect, useState } from "react";
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

export function useOptionalAt(time: number | undefined) {
    const until = time === undefined ? undefined : time - Date.now()
    const [passed, setPassed] = useState<boolean | undefined>(until === undefined ? undefined : until <= 0)
    useUpdateEffect(() => {
        if (until === undefined) {
            return
        }
        setPassed(until <= 0)
    }, [
        until
    ])
    const at = until === undefined ? undefined : until <= 2147483647 ? until : 0
    useEffect(() => {
        if (at === undefined) {
            return
        }
        if (at <= 0) {
            return
        }
        const timeout = setTimeout(() => setPassed(true), at)
        return () => {
            clearTimeout(timeout)
        }
    }, [
        at
    ])
    return passed
}
