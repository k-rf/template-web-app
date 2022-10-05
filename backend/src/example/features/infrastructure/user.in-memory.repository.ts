import { Injectable } from "@nestjs/common";

import { required } from "~/util/class-mapper";

import { User } from "../core/domain/user";
import { UserAge } from "../core/domain/user-age";
import { UserCollection } from "../core/domain/user-collection";
import { UserId } from "../core/domain/user-id";
import { UserName } from "../core/domain/user-name";
import { UserRepository } from "../core/domain/user.repository";

@Injectable()
export class UserInMemoryRepository implements UserRepository {
  async findById(id: UserId): Promise<User> {
    return new User({
      id,
      name: required(UserName, "John"),
      age: required(UserAge, 42),
    });
  }

  async findAll(): Promise<UserCollection> {
    return new UserCollection([
      new User({
        id: required(UserId, undefined),
        name: required(UserName, "John"),
        age: required(UserAge, 42),
      }),
    ]);
  }
}
