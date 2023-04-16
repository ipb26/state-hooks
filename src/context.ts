import { useContext } from "react"

export function useRequiredContext<T extends {} | undefined | null>(context: React.Context<T>) {
    const value = useContext(context)
    if (value === undefined || value === null) {
        throw new Error("This context (" + context.displayName + ") is not in scope.")
    }
    return value
}
