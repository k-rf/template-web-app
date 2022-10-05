import { Collection } from "~/shared/domain/collection";

import { User } from "./user";

export class UserCollection extends Collection<User, "UserCollection"> {
  readonly type = "UserCollection";

  validate(value: User[]): User[] {
    return value;
  }
}
