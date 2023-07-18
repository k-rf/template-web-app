import { Collection } from "~/shared/domain/collection";

import { User } from "./user";

export class UserCollection extends Collection<"UserCollection"> {
  readonly type = "UserCollection";

  constructor(value: User[]) {
    super(value);
  }
}
