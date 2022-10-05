export const required = <T, U>(clazz: { new (args: T): U }, args: T): U => {
  return new clazz(args);
};

export const optional = <T, U>(clazz: { new (args: T): U }, args: T | undefined): U | undefined => {
  return args === undefined || args === null ? undefined : new clazz(args);
};
