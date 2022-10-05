import { Uuid } from "../uuid";

import { DomainPrimitive } from "./domain-primitive";
import { Entity } from "./entity";

class TestId extends Uuid<"TestId"> {
  readonly type = "TestId";
}

class TestNumber extends DomainPrimitive<number, "TestNumber"> {
  readonly type = "TestNumber";

  protected validate(value: number): number {
    return value;
  }
}

class TestString extends DomainPrimitive<string, "TestString"> {
  readonly type = "TestString";

  protected validate(value: string): string {
    return value;
  }
}

type Props = {
  id: TestId;
  num: TestNumber;
  str: TestString;
};

class TestEntity extends Entity<Props, "TestEntity"> {
  readonly type = "TestEntity";

  protected validate(value: Props): Props {
    return value;
  }
}

describe("DomainPrimitive", () => {
  describe("equals", () => {
    const id1 = new TestId();
    const id2 = new TestId();

    it.each([
      [
        new TestEntity({
          id: id1,
          num: new TestNumber(1),
          str: new TestString("abc"),
        }),
        new TestEntity({
          id: id1,
          num: new TestNumber(2),
          str: new TestString("xyz"),
        }),
        true,
      ],
      [
        new TestEntity({
          id: id1,
          num: new TestNumber(1),
          str: new TestString("abc"),
        }),
        new TestEntity({
          id: id2,
          num: new TestNumber(2),
          str: new TestString("xyz"),
        }),
        false,
      ],
      [
        new TestEntity({
          id: id1,
          num: new TestNumber(1),
          str: new TestString("abc"),
        }),
        new TestEntity({
          id: id2,
          num: new TestNumber(1),
          str: new TestString("abc"),
        }),
        false,
      ],
    ])("%s equals %s => %s", (a, b, expected) => {
      expect(a.equals(b)).toStrictEqual(expected);
    });
  });
});
