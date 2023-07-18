import { objectPropertySort } from "~/util/object-property-sort";

export abstract class DomainPrimitive<T extends string> {
  abstract readonly type: T;

  eq(that: DomainPrimitive<T>): boolean {
    return JSON.stringify(objectPropertySort(this)) === JSON.stringify(objectPropertySort(that));
  }

  abstract unpack(): unknown;
}
