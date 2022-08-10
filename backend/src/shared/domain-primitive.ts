import { Collection } from "~/shared/collection";
import { objectPropertySort } from "~/util/object-property-sort";

type P = number | string | boolean | Date;
type D = DomainPrimitive<Primitive, string>;
type C = Collection<D, string>;
type O = Record<string, C | D>;

export type Primitive = P | D | C | O;

export abstract class DomainPrimitive<T extends Primitive, U extends string> {
  abstract readonly type: U;

  constructor(private readonly value: T) {
    this.value = this.validate(value);
  }

  protected abstract validate(value: T): T;

  get _() {
    return this.value;
  }

  equals(that: DomainPrimitive<T, U>): boolean {
    return JSON.stringify(objectPropertySort(this)) === JSON.stringify(objectPropertySort(that));
  }
}
