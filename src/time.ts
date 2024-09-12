import { EffectCallback, useEffect } from "react";
import { useBoolean } from "./boolean";
import { useUpdateEffect } from "./updates";

export const MAXIMUM_AT = 2147483647

export function useAt(time: number | undefined) {
    const until = time === undefined ? undefined : time - Date.now()
    if (until !== undefined) {
        if (until > 2147483647) {
            throw new Error("You can not set a timeout this far in the future: " + time + ".")
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
        if (!already) {
            const timeout = setTimeout(passed.on, until)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [
        until,
    ])
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
