import { Input } from "~/shared/application-service/input";

type Props = {
  id: string;
};

export class GetUserInput extends Input<Props, "GetUserInput"> {
  readonly type = "GetUserInput";
}
