import { useFactory } from "./factory.js";

export function useProp<T, K extends keyof T>(object: T, key: K) {
    return useFactory((object, key) => object[key], [object, key])
}
