import { z } from "zod";

export type UserPhoneNumber = {
  readonly type: "UserPhoneNumber";
  readonly value: string;
  equals(that: UserPhoneNumber): boolean;
};

export const UserPhoneNumber = (value: string): UserPhoneNumber => {
  return {
    value: z
      .string()
      .regex(/[0-9]{3}-[0-9]{4}-[0-9]{4}/)
      .parse(value),
    type: "UserPhoneNumber",
    equals(that) {
      return this.value === that.value;
    },
  };
};
