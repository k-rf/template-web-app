import { Uuid } from "../uuid";

import { DomainPrimitive } from "./domain-primitive";
import { Entity } from "./entity";

class TestId extends Uuid<"TestId"> {
  readonly type = "TestId";
}

class TestNumber extends DomainPrimitive<"TestNumber"> {
  readonly type = "TestNumber";

  constructor(private readonly value: number) {
    super();
  }

  unpack() {
    return this.value;
  }
}

class TestString extends DomainPrimitive<"TestString"> {
  readonly type = "TestString";

  constructor(private readonly value: string) {
    super();
  }

  unpack() {
    return this.value;
  }
}

class TestEntity extends Entity<"TestEntity"> {
  readonly type = "TestEntity";

  readonly id: TestId;
  readonly num: TestNumber;
  readonly str: TestString;

  constructor(props: Property<TestEntity>) {
    super();

    this.id = props.id;
    this.num = props.num;
    this.str = props.str;
  }

  unpack(): Unpack<TestEntity> {
    return {
      id: this.id.unpack(),
      num: this.num.unpack(),
      str: this.str.unpack(),
    };
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
      expect(a.eq(b)).toStrictEqual(expected);
    });
  });
});
