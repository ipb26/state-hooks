import { useCallback } from "react";

export function useBind<T extends Function>(object: object, method: T) {
    return useCallback<T>(method.bind(object), [object, method])
}
