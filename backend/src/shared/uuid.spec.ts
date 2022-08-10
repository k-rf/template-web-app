import { v4 as uuidV4 } from "uuid";
import { z } from "zod";

import { Uuid } from "./uuid";

describe("Uuid", () => {
  describe("constructor", () => {
    it.each([uuidV4(), undefined])('Accepted: "%s"', (a) => {
      expect(z.string().uuid().safeParse(new Uuid(a)._).success).toBeTruthy();
    });

    it.each(["", "abc"])('Rejected: "%s"', (value) => {
      expect(() => new Uuid(value)).toThrow();
    });
  });
});
