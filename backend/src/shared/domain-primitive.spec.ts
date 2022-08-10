import { Collection } from "~/shared/collection";

import { DomainPrimitive, Primitive } from "./domain-primitive";

class TestValueObject extends DomainPrimitive<Primitive, "TestValueObject"> {
  type = "TestValueObject" as const;

  protected validate(value: Primitive): Primitive {
    return value;
  }
}

class TestCollection extends Collection<TestValueObject, "TestCollection"> {
  type = "TestCollection" as const;

  validate(value: TestValueObject[]): TestValueObject[] {
    return value;
  }
}

type Props = {
  valueA: TestValueObject;
  valueB: TestValueObject;
};

class CompositeTestValueObject extends DomainPrimitive<Props, "CompositeTestValueObject"> {
  type = "CompositeTestValueObject" as const;

  protected validate(value: Props): Props {
    return value;
  }
}

describe("DomainPrimitive", () => {
  describe("equals", () => {
    it.each([
      [1, 1, true],
      [1, 2, false],
      ["abc", "abc", true],
      ["abc", "xyz", false],
      [new Date(0), new Date(0), true],
      [new Date(0), new Date(1), false],
      [
        new TestValueObject(new TestCollection([new TestValueObject(0), new TestValueObject(1)])),
        new TestValueObject(new TestCollection([new TestValueObject(0), new TestValueObject(1)])),
        true,
      ],
      [
        new TestValueObject(new TestCollection([new TestValueObject(0), new TestValueObject(1)])),
        new TestValueObject(new TestCollection([new TestValueObject(1), new TestValueObject(0)])),
        false,
      ],
      [new TestValueObject(0), new TestValueObject(0), true],
      [new TestValueObject(0), new TestValueObject(1), false],
      [new TestValueObject("abc"), new TestValueObject("abc"), true],
      [new TestValueObject("abc"), new TestValueObject("xyz"), false],
      [new TestValueObject(new Date(0)), new TestValueObject(new Date(0)), true],
      [new TestValueObject(new Date(0)), new TestValueObject(new Date(1)), false],
      [
        new CompositeTestValueObject({
          valueA: new TestValueObject(0),
          valueB: new TestValueObject(0),
        }),
        new CompositeTestValueObject({
          valueA: new TestValueObject(0),
          valueB: new TestValueObject(0),
        }),
        true,
      ],
      [
        new CompositeTestValueObject({
          valueA: new TestValueObject(0),
          valueB: new TestValueObject(0),
        }),
        new CompositeTestValueObject({
          valueA: new TestValueObject(0),
          valueB: new TestValueObject(1),
        }),
        false,
      ],
      [
        new CompositeTestValueObject({
          valueA: new TestValueObject(0),
          valueB: new TestValueObject(0),
        }),
        new CompositeTestValueObject({
          valueA: new TestValueObject(1),
          valueB: new TestValueObject(0),
        }),
        false,
      ],
      [
        new CompositeTestValueObject({
          valueA: new TestValueObject(0),
          valueB: new TestValueObject(0),
        }),
        new CompositeTestValueObject({
          valueA: new TestValueObject(1),
          valueB: new TestValueObject(1),
        }),
        false,
      ],
    ])("%s equals %s => %s", (a, b, expected) => {
      const valueA = new TestValueObject(a);
      const valueB = new TestValueObject(b);

      expect(valueA.equals(valueB)).toStrictEqual(expected);
    });
  });
});
