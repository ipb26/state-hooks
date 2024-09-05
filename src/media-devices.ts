import { useEffect, useState } from "react"

export function useMediaDevicesPromise(mediaDevices: MediaDevices = navigator.mediaDevices) {
    const [promise, setPromise] = useState<PromiseLike<readonly MediaDeviceInfo[]>>(navigator.mediaDevices.enumerateDevices())
    useEffect(() => {
        const listener = () => {
            setPromise(mediaDevices.enumerateDevices())
        }
        mediaDevices.addEventListener("devicechange", listener)
        return () => {
            mediaDevices.removeEventListener("devicechange", listener)
        }
    }, [
        mediaDevices
    ])
    return promise
}
