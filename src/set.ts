import { useCallback, useState } from "react";

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
    const removeSymmetric = useCallback((elements: Iterable<T>) => {
        setValue(value => value.symmetricDifference(new Set(elements)))
    }, [
        setValue
    ])
    const intersect = useCallback((elements: Iterable<T>) => {
        setValue(value => value.intersection(new Set(elements)))
    }, [
        setValue
    ])
    const strip = useCallback(() => {
        setValue(new Set())
        return value
    }, [
        value,
        setValue
    ])
    const clear = useCallback(() => {
        setValue(new Set())
    }, [
        setValue
    ])
    return {
        value,
        setValue,
        add,
        remove,
        removeSymmetric,
        intersect,
        strip,
        clear
    }
}
