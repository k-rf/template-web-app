import { z } from "zod";

import { DomainPrimitive } from "~/shared/domain/domain-primitive";

export class UserAge extends DomainPrimitive<"UserAge"> {
  readonly type = "UserAge";

  constructor(private readonly value: number) {
    super();

    this.value = z.number().min(0).max(200).int().parse(value);
  }

  unpack() {
    return this.value;
  }
}
