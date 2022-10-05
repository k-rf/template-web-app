import { Uuid } from "~/shared/uuid";

export class UserId extends Uuid<"UserId"> {
  readonly type = "UserId";
}
