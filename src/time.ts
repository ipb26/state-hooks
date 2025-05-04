import { EffectCallback, useEffect } from "react";
import { useBoolean } from "./boolean";
import { useUpdateEffect } from "./updates";

export const MAXIMUM_AT = 2147483647

/**
 * Returns true at the specified date.
 * @param time When to return true.
 * @returns True or false.
 */
export function useAt(time: number | Date | undefined, ignoreFutureTooDistantError = false) {
    const ms = time === undefined ? undefined : (typeof time === "number" ? time : time.getTime())
    const until = ms === undefined ? undefined : ms - Date.now()
    if (until !== undefined) {
        if (until > 2147483647) {
            if (!ignoreFutureTooDistantError) {
                throw new Error("You can not set a timeout this far in the future: " + ms + ".")
            }
        }
    }
    const already = until === undefined ? false : until <= 0
    const passed = useBoolean(already)
    useUpdateEffect(() => {
        passed.set(already)
    }, [
        already
    ])
    useEffect(() => {
        if (until === undefined) {
            return
        }
        if (!already) {
            const timeout = setTimeout(passed.on, until)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [
        until,
    ])
    if (until !== undefined) {
        if (until > 2147483647) {
            return false
        }
    }
    return passed.value
}

/*
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
}*/

export function useEffectAt(time: number | undefined, effect: EffectCallback) {
    const at = useAt(time)
    useEffect(() => {
        if (at) {
            return effect()
        }
    }, [
        at
    ])
}
