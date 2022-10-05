import { Input } from "./input";
import { Output } from "./output";

type FanIn = Input<unknown, string> | unknown;
type FanOut =
  | Promise<Output<unknown, string>>
  | Output<unknown, string>
  | Promise<void>
  | void
  | unknown;

export abstract class ApplicationService<I extends FanIn = FanIn, O extends FanOut = FanOut> {
  abstract handle(input: I): O;
}
