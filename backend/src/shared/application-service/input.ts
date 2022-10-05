import { Frozen } from "~/util/utility-type";

export abstract class Input<T, U extends string> {
  readonly brand = "Input";
  abstract readonly type: U;

  readonly value: Frozen<T>;

  constructor(value: Frozen<T>) {
    this.value = value;
  }
}
