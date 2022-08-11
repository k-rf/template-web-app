import { v4 } from "uuid";
import { z } from "zod";

export type UserId = {
  readonly type: "UserId";
  readonly value: string;
  equals(that: UserId): boolean;
};

export const UserId = (value?: string): UserId => {
  return {
    value: z
      .string()
      .uuid()
      .parse(value ?? v4()),
    type: "UserId",
    equals(that) {
      return this.value === that.value;
    },
  };
};
