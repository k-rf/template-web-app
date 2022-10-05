import { Frozen } from "~/util/utility-type";

import { Uuid } from "../uuid";

import { Collection } from "./collection";
import { DomainPrimitive, Primitive } from "./domain-primitive";

type D = DomainPrimitive<Primitive, string>;
type C = Collection<D, string>;
type O = Record<"id", Uuid<string>> & Record<string, C | D>;

export abstract class Entity<T extends O, U extends string> {
  readonly brand = "Entity";
  abstract readonly type: U;

  constructor(readonly value: Frozen<T>) {
    this.value = this.validate(value);
  }

  protected abstract validate(value: Frozen<T>): Frozen<T>;

  equals(that: Entity<T, U>): boolean {
    return this.value.id.equals(that.value.id);
  }
}
