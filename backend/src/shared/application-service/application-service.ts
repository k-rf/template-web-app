import { Input } from "./input";
import { Output } from "./output";

type FanIn = Input<unknown, string>;
type FanOut = Output<unknown, string> | void;

export abstract class ApplicationService<I extends FanIn = FanIn, O extends FanOut = FanOut> {
  abstract handle(input: I): Promise<O> | O;
}
