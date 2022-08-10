import { DomainPrimitive } from "./domain-primitive";
import { Entity } from "./entity";
import { Uuid } from "./uuid";

class TestId extends Uuid<"TestId"> {
  override type = "TestId" as const;
}

class TestNumber extends DomainPrimitive<number, "TestNumber"> {
  type = "TestNumber" as const;

  protected validate(value: number): number {
    return value;
  }
}

class TestString extends DomainPrimitive<string, "TestString"> {
  type = "TestString" as const;

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
  type = "TestEntity" as const;

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
