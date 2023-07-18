import { z } from "zod";

import { DomainPrimitive } from "~/shared/domain/domain-primitive";

export class UserName extends DomainPrimitive<"UserName"> {
  readonly type = "UserName";

  constructor(private readonly value: string) {
    super();

    this.value = z.string().min(1).max(50).parse(value);
  }

  unpack() {
    return this.value;
  }
}
