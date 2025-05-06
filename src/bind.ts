import { useCallback } from "react";

export function useBind<T extends Function>(method: T, object: object | null = null) {
    return useCallback<T>(method.bind(object), [object, method])
}
