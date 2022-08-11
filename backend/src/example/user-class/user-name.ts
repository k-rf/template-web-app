import { z } from "zod";

import { DomainPrimitive } from "~/shared/domain-primitive";

export class UserName extends DomainPrimitive<string, "UserName"> {
  type = "UserName" as const;

  protected validate(value: string): string {
    return z.string().min(1).max(50).parse(value);
  }
}
