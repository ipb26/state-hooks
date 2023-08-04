import { useEffect, useState } from "react"
import { useBoolean } from "./boolean"

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
}
