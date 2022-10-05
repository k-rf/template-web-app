import { objectPropertySort } from "~/util/object-property-sort";
import { Frozen } from "~/util/utility-type";

import { Collection } from "./collection";

type P = number | string | boolean | Date;
type D = DomainPrimitive<Primitive, string>;
type C = Collection<D, string>;
type O = Record<string, C | D>;

export type Primitive = P | D | C | O;

export abstract class DomainPrimitive<T extends Primitive, U extends string> {
  readonly brand = "DomainPrimitive";
  abstract readonly type: U;

  constructor(readonly value: Frozen<T>) {
    this.value = this.validate(value);
  }

  protected abstract validate(value: Frozen<T>): Frozen<T>;

  equals(that: Frozen<DomainPrimitive<T, U>>): boolean {
    return JSON.stringify(objectPropertySort(this)) === JSON.stringify(objectPropertySort(that));
  }
}
