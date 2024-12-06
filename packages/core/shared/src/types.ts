// eslint-disable-next-line @typescript-eslint/ban-types -- works as intended
export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};
