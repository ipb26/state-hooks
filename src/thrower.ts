import { useEffect, useState } from "react"

/**
 * Returns a convenience method to throw an exception that is caught by the nearest error boundary.
 * @returns A method to throw an exception.
 */
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
