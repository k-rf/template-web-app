import { z } from "zod";

import { DomainPrimitive } from "~/shared/domain-primitive";

export class UserAge extends DomainPrimitive<number, "UserAge"> {
  type = "UserAge" as const;

  protected validate(value: number): number {
    return z.number().min(0).max(200).parse(value);
  }
}
