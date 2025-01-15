import { EffectCallback, useEffect } from "react";

export function useIf(value: boolean, ifCallback?: EffectCallback | undefined, elseCallback?: EffectCallback | undefined) {
    useEffect(() => {
        if (value) {
            return ifCallback?.()
        }
        else {
            return elseCallback?.()
        }
    }, [
        value
    ])
}