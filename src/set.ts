import { useCallback, useMemo, useState } from "react";

/**
 * Returns convenience methods to update an array.
 * @param delay The initial value of the array.
 * @returns An array interface.
 */
export function useSet<T>(initialValue: ReadonlySet<T> | (() => ReadonlySet<T>) = new Set()) {
    const [value, setValue] = useState(initialValue)
    const add = useCallback((elements: Iterable<T>) => {
        setValue(value => value.union(new Set(elements)))
    }, [
        setValue
    ])
    const remove = useCallback((elements: Iterable<T>) => {
        setValue(value => value.difference(new Set(elements)))
    }, [
        setValue
    ])
    const clear = () => setValue(new Set())
    return useMemo(() => {
        return {
            value,
            setValue,
            add,
            remove,
            clear
        }
    }, [
        value
    ])
}
