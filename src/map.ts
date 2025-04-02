import { useMemo, useState } from "react";

export type MapState<K, V> = ReturnType<typeof useMap<K, V>>

/**
 * Returns convenience methods to update a map.
 * @param delay The initial value of the map.
 * @returns An array interface.
 */
export function useMap<K, V>(initialValue: ReadonlyMap<K, V> = new Map<K, V>()) {
    const [state, setState] = useState(initialValue)
    return useMemo(() => {
        return {
            value: state,
            get: state.get.bind(state),
            has: state.has.bind(state),
            keys: state.keys.bind(state),
            entries: state.entries.bind(state),
            size: state.size,
            values: state.values.bind(state),
            replace: (map: ReadonlyMap<K, V>) => {
                setState(new Map<K, V>(map))
            },
            clear: () => {
                setState(new Map<K, V>())
            },
            set: (key: K, value: V) => {
                setState(old => {
                    const map = new Map<K, V>(old)
                    map.set(key, value)
                    return map
                })
            },
            delete: (key: K) => {
                setState(old => {
                    const map = new Map<K, V>(old)
                    map.delete(key)
                    return map
                })
            },
        }
    }, [
        state
    ])
}
