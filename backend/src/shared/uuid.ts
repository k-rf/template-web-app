import { v4 as uuidV4 } from "uuid";
import { z } from "zod";

import { DomainPrimitive } from "./domain/domain-primitive";

export abstract class Uuid<T extends string> extends DomainPrimitive<T> {
  abstract override readonly type: T;

  private readonly value: string;

  constructor(value?: string) {
    super();

    if (value === null || value === undefined) {
      this.value = uuidV4();
    } else {
      this.value = z.string().uuid().parse(value);
    }
  }

  unpack() {
    return this.value;
  }
}
