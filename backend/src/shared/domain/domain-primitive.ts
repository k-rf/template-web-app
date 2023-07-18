export abstract class DomainPrimitive<T extends string> {
  abstract readonly type: T;

  eq(that: DomainPrimitive<T>): boolean {
    return Object.entries(this)
      .filter<[keyof typeof that, unknown]>(
        (entry): entry is [keyof typeof that, unknown] => typeof entry[1] !== "function",
      )
      .every(([key]) => {
        // FIXME: DomainPrimitive の入れ子構造に対応できていない
        return this[key].toString() === that[key].toString();
      });
  }

  abstract unpack(): unknown;
}
