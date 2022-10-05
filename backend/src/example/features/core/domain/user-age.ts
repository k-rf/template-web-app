import { z } from "zod";

import { DomainPrimitive } from "~/shared/domain/domain-primitive";

export class UserAge extends DomainPrimitive<number, "UserAge"> {
  readonly type = "UserAge";

  protected validate(value: number): number {
    return z.number().min(0).max(200).int().parse(value);
  }
}
