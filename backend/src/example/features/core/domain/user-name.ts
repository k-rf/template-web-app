import { z } from "zod";

import { DomainPrimitive } from "~/shared/domain/domain-primitive";

export class UserName extends DomainPrimitive<string, "UserName"> {
  readonly type = "UserName";

  protected validate(value: string): string {
    return z.string().min(1).max(50).parse(value);
  }
}
