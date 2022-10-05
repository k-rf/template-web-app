import { Frozen } from "~/util/utility-type";

export abstract class Output<T, U extends string> {
  readonly brand = "Output";
  abstract readonly type: U;

  readonly value: Frozen<T>;

  constructor(value: Frozen<T>) {
    this.value = value;
  }
}
