import { DomainPrimitive, Primitive } from "~/shared/domain-primitive";

export abstract class Collection<T extends DomainPrimitive<Primitive, string>, U extends string> {
  abstract readonly type: U;

  constructor(protected readonly value: T[]) {
    this.value = this.validate(value);
  }

  abstract validate(value: T[]): T[];

  get _() {
    return this.value;
  }
}
