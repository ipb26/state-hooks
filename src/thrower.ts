import { useEffect, useState } from "react"

export function useThrower() {
    const [exception, setException] = useState<unknown>()
    useEffect(() => {
        if (exception !== undefined) {
            throw exception
        }
    }, [
        exception
    ])
    return setException
}
