import { v4 } from "uuid";

import { UserAge } from "~/example/user-type/user-age";
import { UserId } from "~/example/user-type/user-id";
import { UserName } from "~/example/user-type/user-name";
import { UserPhoneNumber } from "~/example/user-type/user-phone-number";

type Props = {
  id: UserId;
  age: UserAge;
  name: UserName;
  phoneNumber: UserPhoneNumber;
  ext: UserAge | UserName | UserPhoneNumber;
};

export type User = {
  type: "User";
  equals(that: User): boolean;
} & Props;

export const User = {
  new(value: Props): User {
    return {
      type: "User",
      equals(that) {
        return this.id === that.id;
      },
      ...value,
    };
  },
};

const user = User.new({
  age: UserAge(42),
  id: UserId(v4()),
  name: UserName("John Doe"),
  phoneNumber: UserPhoneNumber("000-0000-0000"),
  ext: UserAge(42),
});

user.equals(user);

user.age.value;

const { type, value } = user.ext;

switch (type) {
  case "UserAge":
    value.toFixed();
    break;
  case "UserName":
    value.toUpperCase();
    break;
  case "UserPhoneNumber":
    value.toLocaleLowerCase();
    break;
}
