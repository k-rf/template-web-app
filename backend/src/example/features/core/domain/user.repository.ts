import { Injectable } from "@nestjs/common";

import { User } from "./user";
import { UserCollection } from "./user-collection";
import { UserId } from "./user-id";

@Injectable()
export abstract class UserRepository {
  abstract findById(id: UserId): Promise<User>;
  abstract findAll(): Promise<UserCollection>;
}
