export type Frozen<T> = T extends CallableFunction ? T : { readonly [K in keyof T]: Frozen<T[K]> };
