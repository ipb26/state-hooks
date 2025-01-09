import { useMemo, useState } from "react";

export type MapState<K, V> = ReturnType<typeof useMap<K, V>>

/**
 * Returns convenience methods to update a map.
 * @param delay The initial value of the map.
 * @returns An array interface.
 */
export function useMap<K, V>(initialValue: ReadonlyMap<K, V>) {
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
                setState(map)
            },
            clear: () => {
                setState(new Map<K, V>())
            },
            set: (key: K, value: V) => {
                const map = new Map<K, V>(state)
                map.set(key, value)
                setState(map)
            },
            delete: (key: K) => {
                const map = new Map<K, V>(state)
                map.delete(key)
                setState(map)
            },
        }
    }, [
        state
    ])
}
