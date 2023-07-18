import { DomainPrimitive } from "./domain-primitive";

class TestValueObject extends DomainPrimitive<"TestValueObject"> {
  readonly type = "TestValueObject";

  constructor(private readonly value: number | string | Date) {
    super();
  }

  unpack() {
    return this.value;
  }
}

// class TestCollection extends Collection<"TestCollection"> {
//   readonly type = "TestCollection";

//   constructor(value: TestValueObject[]) {
//     super(value);
//   }
// }

class CompositeTestValueObject extends DomainPrimitive<"CompositeTestValueObject"> {
  readonly type = "CompositeTestValueObject";

  private readonly valueA: TestValueObject;
  private readonly valueB: TestValueObject;

  constructor(props: { valueA: TestValueObject; valueB: TestValueObject }) {
    super();

    this.valueA = props.valueA;
    this.valueB = props.valueB;
  }

  unpack() {
    return {
      valueA: this.valueA.unpack(),
      valueB: this.valueB.unpack(),
    };
  }
}

describe("DomainPrimitive", () => {
  describe("eq", () => {
    it.each([
      [new TestValueObject(1), new TestValueObject(1), true],
      [new TestValueObject(1), new TestValueObject(2), false],
      [new TestValueObject("abc"), new TestValueObject("abc"), true],
      [new TestValueObject("abc"), new TestValueObject("xyz"), false],
      [new TestValueObject(new Date(0)), new TestValueObject(new Date(0)), true],
      [new TestValueObject(new Date(0)), new TestValueObject(new Date(1)), false],
      [new TestValueObject(0), new TestValueObject(0), true],
      [new TestValueObject(0), new TestValueObject(1), false],
      [new TestValueObject("abc"), new TestValueObject("abc"), true],
      [new TestValueObject("abc"), new TestValueObject("xyz"), false],
      [new TestValueObject(new Date(0)), new TestValueObject(new Date(0)), true],
      [new TestValueObject(new Date(0)), new TestValueObject(new Date(1)), false],
    ])("%s eq %s => %s", (a, b, expected) => {
      expect(a.eq(b)).toStrictEqual(expected);
    });

    it.each([
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
    ])("%s eq %s => %s", (a, b, expected) => {
      expect(a.eq(b)).toStrictEqual(expected);
    });
  });
});
