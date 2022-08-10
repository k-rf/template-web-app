import { Collection } from "~/shared/collection";

import { DomainPrimitive, Primitive } from "./domain-primitive";
import { Uuid } from "./uuid";

type D = DomainPrimitive<Primitive, string>;
type C = Collection<D, string>;
type O = Record<"id", Uuid<string>> & Record<string, C | D>;

export abstract class Entity<T extends O, U extends string> {
  abstract readonly type: U;

  constructor(protected readonly value: T) {
    this.value = this.validate(value);
  }

  protected abstract validate(value: T): T;

  get _() {
    return this.value;
  }

  equals(that: Entity<T, U>): boolean {
    return this.value.id.equals(that.value.id);
  }
}
