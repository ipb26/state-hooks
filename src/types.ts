
export type DepsAreEqual<TDependencyList> = (prevDeps: TDependencyList, nextDeps: TDependencyList) => boolean
