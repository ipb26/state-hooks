import { DependencyList, EffectCallback, useEffect, useRef } from "react"

export function useIsFirstMount() {
    const isFirst = useRef(true)
    if (isFirst.current) {
        isFirst.current = false
        return true
    }
    return isFirst.current
}

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList | undefined) {
    const firstMount = useIsFirstMount()
    return useEffect(() => {
        if (firstMount) {
            return
        }
        return effect()
    }, deps)
}
