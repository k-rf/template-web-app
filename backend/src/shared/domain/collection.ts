import { DomainPrimitive } from "./domain-primitive";
import { Entity } from "./entity";

type DomainObject = DomainPrimitive<string> | Entity<string>;

export abstract class Collection<T extends string> {
  abstract readonly type: T;

  constructor(private readonly value: DomainObject[]) {}

  unpack() {
    return this.value.map((e) => e.unpack());
  }
}
