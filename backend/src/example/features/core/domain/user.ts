import { Entity } from "~/shared/domain/entity";

import { UserAge } from "./user-age";
import { UserId } from "./user-id";
import { UserName } from "./user-name";

type Props = {
  id: UserId;
  name: UserName;
  age: UserAge;
};

export class User extends Entity<Props, "User"> {
  readonly type = "User";

  protected validate(value: Props): Props {
    return value;
  }
}
