import { useEffect, useState } from "react"
import { useBoolean } from "./boolean"

type AsyncCallback<R, A extends readonly unknown[]> = (...args: A) => Promise<R>

export function useMutex() {
    const [promise, setPromise] = useState<Promise<void>>()
    const locked = useBoolean()
    const lock = async () => {
        if (promise !== undefined) {
            await promise
        }
        locked.on()
    }
    return {
        isLocked: locked.value,
        lock: locked.on,
        release: locked.off,
        runExclusive: async <T>(func: () => Promise<T>) => {
            locked.on()
            try {

            }
            catch (e) {
                //TODO throw err
                locked.off()
            }
        }
    }
}

export function useAsyncCallback<R, A extends readonly unknown[]>(func: (...args: A) => Promise<R>) {
    const busy = useBoolean()
    const [result, setResult] = useState<PromiseSettledResult<unknown>>()
    useEffect(() => {
        if (result !== undefined) {
            if (result.status === "rejected") {
                throw result.reason
            }
        }
    }, [
        result
    ])
    return {
        busy: busy.value,
        call: async (...args: A) => {
            busy.on()
            setResult(undefined)
            try {
                setResult({
                    status: "fulfilled",
                    value: await func(...args)
                })
            }
            catch (reason) {
                setResult({
                    status: "rejected",
                    reason
                })
            }
            finally {
                busy.off()
            }
        }
    }
    /*
        const [promise, setPromise] = useState<Promise<R>>()
    
    
    
        const [pending, setPending] = useState(0)
        useEffect(() => {
            if (promise !== undefined) {
                setPending(_ => _ + 1)
                promise.then(value => setResult({ status: "fulfilled", value }), reason => setResult({ status: "rejected", reason }))
            }
        }, [
            promise
        ])
        useEffect(() => {
            if (result !== undefined) {
                if (result.status === "rejected") {
                    throw result.reason
                }
            }
        }, [
            result
        ])
        const run = useCallback(async (...args: A) => setPromise(options.callback(...args)), [options.callback])
        return {
    
        }*/
}
