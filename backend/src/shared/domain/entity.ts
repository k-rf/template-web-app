import { DomainPrimitive } from "./domain-primitive";

export abstract class Entity<T extends string> {
  abstract readonly type: T;

  abstract readonly id: DomainPrimitive<string>;

  eq(that: Entity<T>): boolean {
    return this.id.eq(that.id);
  }

  abstract unpack(): unknown;
}
