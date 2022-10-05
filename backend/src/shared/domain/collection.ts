import { Uuid } from "../uuid";

import { DomainPrimitive, Primitive } from "./domain-primitive";
import { Entity } from "./entity";

export abstract class Collection<
  T extends DomainPrimitive<Primitive, string> | Entity<{ id: Uuid<string> }, string>,
  U extends string
> {
  abstract readonly type: U;

  constructor(readonly value: T[]) {
    this.value = this.validate(value);
  }

  abstract validate(value: T[]): T[];
}
