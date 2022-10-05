import { v4 as uuidV4 } from "uuid";
import { z } from "zod";

import { Uuid } from "./uuid";

class TestId extends Uuid<"TestId"> {
  readonly type = "TestId";
}

describe("Uuid", () => {
  describe("constructor", () => {
    it.each([uuidV4(), undefined])('Accepted: "%s"', (a) => {
      expect(z.string().uuid().safeParse(new TestId(a).value).success).toBeTruthy();
    });

    it.each(["", "abc"])('Rejected: "%s"', (value) => {
      expect(() => new TestId(value)).toThrow();
    });
  });
});
