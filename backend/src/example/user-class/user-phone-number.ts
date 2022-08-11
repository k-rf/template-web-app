import { z } from "zod";

import { DomainPrimitive } from "~/shared/domain-primitive";

export class UserPhoneNumber extends DomainPrimitive<string, "UserPhoneNumber"> {
  type = "UserPhoneNumber" as const;

  protected validate(value: string): string {
    return z
      .string()
      .regex(/[0-9]{3}-[0-9]{4}-[0-9]{4}/)
      .parse(value);
  }
}
