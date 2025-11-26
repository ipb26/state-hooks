import { useEffect, useState } from "react"
import { useAsyncCallback } from "./async-callback"
import { useThrower } from "./thrower"

/**
 * Check whether a web lock is taken. Note that this has no way to tell when a lock is started. You will need to call update on the resulting object when the lock is first opened. We recommend using a broadcast channel.
 */
export function useWebLock(name: string) {
    const thrower = useThrower()
    const [locked, setLocked] = useState<boolean>()
    const update = useAsyncCallback(async () => {
        const locks = await navigator.locks.query()
        const held = locks.held ?? []
        setLocked(held.some(lock => lock.name === name))
    }, [
        name,
    ])
    useEffect(() => {
        setLocked(undefined)
        update()
    }, [
        update
    ])
    useEffect(() => {
        if (locked === undefined || !locked) {
            return
        }
        const controller = new AbortController()
        navigator.locks.request(name, { signal: controller.signal, mode: "shared" }, () => {
            setLocked(false)
        }).catch(error => {
            if (error instanceof DOMException && error.name === 'AbortError') {
                return
            }
            thrower(error)
        })
        return () => {
            controller.abort()
        }
    }, [
        locked,
    ])
    return {
        locked,
        update,
    }
}
