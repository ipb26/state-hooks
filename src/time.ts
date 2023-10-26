import { useEffect, useState } from "react";

//TODO optional
export function useAt(time: number | undefined) {
    const [passed, setPassed] = useState<boolean>()
    useEffect(() => {
        if (time === undefined) {
            setPassed(undefined)
        }
        else {
            setPassed(time <= Date.now())
            const timeout = setTimeout(() => setPassed(true), time - Date.now())
            return () => {
                clearInterval(timeout)
            }
        }
    }, [
        time
    ])
    return passed
}
