import { Output } from "~/shared/application-service/output";

type Props = {
  id: string;
  name: string;
  age: number;
};

export class GetUserOutput extends Output<Props, "GetUserOutput"> {
  readonly type = "GetUserOutput";
}
