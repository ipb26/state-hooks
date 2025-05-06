import { useMemo, useState } from "react";

/**
 * Returns convenience methods to update an array.
 * @param delay The initial value of the array.
 * @returns An array interface.
 */
export function useArray<T>(initialValue: readonly T[] = []) {
    const [value, setValue] = useState(initialValue)
    const append = (...append: readonly T[]) => {
        setValue(value => [...value, ...append])
    }
    const prepend = (...prepend: readonly T[]) => {
        setValue(value => [...prepend, ...value])
    }
    /*
    const shift = () => {
        const first = value.at(0)
        setValue(value.slice(1))
        return first
    }
    const shifts = (count = 1): readonly T[] => {
        const first = value.slice(0, count)
        setValue(value.slice(count))
        return first
    }
    const pop = () => pops(1)
    const pops = (count = 1) => setValue(value => value.slice(0, -1 * count))*/
    const splice = (index: number, deleteCount = 1) => setValue(value => value.toSpliced(index, deleteCount))
    const clear = () => {
        setValue([])
    }
    return useMemo(() => {
        return {
            value,
            setValue,
            append,
            prepend,
            //pop,
            //pops,
            //shift,
            //shifts,
            splice,
            clear
        }
    }, [
        value
    ])
}
