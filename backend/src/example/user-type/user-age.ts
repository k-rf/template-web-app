import { z } from "zod";

export type UserAge = {
  readonly type: "UserAge";
  readonly value: number;
  equals(that: UserAge): boolean;
};

export const UserAge = (value: number): UserAge => {
  return {
    value: z.number().min(0).max(200).parse(value),
    type: "UserAge",
    equals(that) {
      return this.value === that.value;
    },
  };
};

const age = UserAge(42);

age.equals(age);
