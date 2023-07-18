import { Entity } from "~/shared/domain/entity";

import { UserAge } from "./user-age";
import { UserId } from "./user-id";
import { UserName } from "./user-name";

export class User extends Entity<"User"> {
  readonly type = "User";

  readonly id: UserId;
  readonly name: UserName;
  readonly age: UserAge;

  constructor(props: Property<User>) {
    super();

    this.id = props.id;
    this.name = props.name;
    this.age = props.age;
  }

  unpack(): Unpack<User> {
    return {
      id: this.id.unpack(),
      name: this.name.unpack(),
      age: this.age.unpack(),
    };
  }
}
