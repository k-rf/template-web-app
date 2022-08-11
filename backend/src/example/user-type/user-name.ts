import { z } from "zod";

export type UserName = {
  readonly type: "UserName";
  readonly value: string;
  equals(that: UserName): boolean;
};

export const UserName = (value: string): UserName => {
  return {
    value: z.string().min(1).max(50).parse(value),
    type: "UserName",
    equals(that) {
      return this.value === that.value;
    },
  };
};
