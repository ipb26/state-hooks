import { useEffect } from "react";
import { useBoolean } from "./boolean";

/*


export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>));
  }
}


export interface EventListenerObject<E> {

    handleEvent(event: E): void

}

export interface HasEvents<E> {
    addEventListener(type: string,
        listener: ((event: E) => void) | EventListenerObject<E> | null,
        options?: boolean | AddEventListenerOptions
    ): void
    removeEventListener(type: string,
        listener: ((event: E) => void) | EventListenerObject<E> | null,
        options?: EventListenerOptions | boolean
    ): void
}

export function useEvent<T>(target: HasEvents<T>, eventName: string, startingState?: T) {
    const [event, setEvent] = useState<T>()
    useEffectOnce(() => {
        window.document.addEventListener(eventName, setEvent)
        return () => {
            window.document.removeEventListener(eventName, setEvent)
        }
    })
    return event
}
*/

export function useVisibility() {
    const visible = useBoolean(document.visibilityState === "visible")
    useEffect(() => {
        const listener = () => visible.set(document.visibilityState === "visible")
        window.document.addEventListener("visibilitychange", listener)
        return () => {
            window.document.removeEventListener("visibilitychange", listener)
        }
    }, [
        window
    ])
    return visible.value
}
