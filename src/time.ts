import { EffectCallback, useEffect } from "react";
import { useBoolean } from "./boolean";
import { useUpdateEffect } from "./updates";

export const MAXIMUM_AT = 2147483647

/**
 * Returns true at the specified date.
 * @param time When to return true.
 * @returns True or false.
 */
export function useAt(time: number | Date | undefined, ifTooDistant: "ignore" | "throwError" = "throwError") {
    const ms = time === undefined ? undefined : (typeof time === "number" ? time : time.getTime())
    const until = ms === undefined ? undefined : ms - Date.now()
    const tooDistant = until !== undefined ? until > 2147483647 : false
    if (tooDistant) {
        if (ifTooDistant === "throwError") {
            throw new Error("You can not set a timeout this far in the future: " + ms + ".")
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
    if (tooDistant) {
        return false
    }
    return passed.value
}

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
