import { UserAge } from "~/example/user-class/user-age";
import { UserId } from "~/example/user-class/user-id";
import { UserName } from "~/example/user-class/user-name";
import { UserPhoneNumber } from "~/example/user-class/user-phone-number";
import { Entity } from "~/shared/entity";

type Props = {
  id: UserId;
  age: UserAge;
  name: UserName;
  phoneNumber?: UserPhoneNumber;
  ext: UserAge | UserName | UserPhoneNumber;
};

export class User extends Entity<Props, "User"> {
  readonly type = "User";

  protected validate(value: Props): Props {
    return value;
  }
}

const user = new User({
  id: new UserId(),
  age: new UserAge(42),
  name: new UserName("John Doe"),
  phoneNumber: new UserPhoneNumber("000-0000-0000"),
  ext: new UserAge(42),
});

user.equals(user);

const { type, _ } = user._.ext;

switch (type) {
  case "UserAge":
    _.toFixed();
    break;
  case "UserName":
    _.toUpperCase();
    break;
  case "UserPhoneNumber":
    _.toLocaleLowerCase();
    break;
}
