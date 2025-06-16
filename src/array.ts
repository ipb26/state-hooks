import { useMemo, useState } from "react";

/**
 * Returns convenience methods to update an array.
 * @param delay The initial value of the array.
 * @returns An array interface.
 */
export function useArray<T>(initialValue: readonly T[] = []) {
    const [value, setValue] = useState(initialValue)
    const append = (...append: readonly T[]) => setValue(value => [...value, ...append])
    const prepend = (...prepend: readonly T[]) => setValue(value => [...prepend, ...value])
    const splice = (index: number, deleteCount = 1) => setValue(value => value.toSpliced(index, deleteCount))
    const clear = () => setValue([])
    return useMemo(() => {
        return {
            value,
            setValue,
            append,
            prepend,
            splice,
            clear
        }
    }, [
        value
    ])
}
