import { useState } from "react"

export function useThrower() {
    const [exception, setException] = useState<unknown>()
    if (exception !== undefined) {
        throw exception
    }
    return setException
}
