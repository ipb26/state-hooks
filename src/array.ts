import { useMemo, useState } from "react";

export function useArray<T>(initialValue: T[] = []) {
    const [value, setValue] = useState(initialValue)
    const shift = () => {
        const first = value.at(0)
        setValue(value.slice(1))
        return first
    }
    const shifts = (count = 1) => {
        const first = value.slice(0, count)
        setValue(value.slice(count))
        return first
    }
    const append = (...append: T[]) => {
        setValue(value => [...value, ...append])
    }
    const prepend = (...prepend: T[]) => {
        setValue(value => [...prepend, ...value])
    }
    const pop = () => {
        const last = value.at(-1)
        setValue(value.slice(0, -1))
        return last
    }
    const pops = (count = 1) => {
        const last = value.slice(-1 * count)
        setValue(value.slice(0, -1 * count))
        return last
    }
    const clear = () => {
        setValue([])
    }
    return useMemo(() => {
        return {
            value,
            setValue,
            append,
            prepend,
            pop,
            pops,
            shift,
            shifts,
            clear
        }
    }, [
        value
    ])
}
