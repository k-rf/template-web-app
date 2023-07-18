import { Injectable } from "@nestjs/common";

import { InfrastructureError } from "~/error/infrastructure.error";
import { PrismaService } from "~/lib/database/prisma.service";
import { required } from "~/util/class-mapper";

import { User } from "../core/domain/user";
import { UserAge } from "../core/domain/user-age";
import { UserCollection } from "../core/domain/user-collection";
import { UserId } from "../core/domain/user-id";
import { UserName } from "../core/domain/user-name";
import { UserRepository } from "../core/domain/user.repository";

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: UserId): Promise<User> {
    const result = await this.prismaService.user.findUnique({ where: { id: id.unpack() } });

    if (!result) {
      throw new InfrastructureError("Not Found");
    }

    return new User({
      id: required(UserId, result.id),
      age: required(UserAge, result.age),
      name: required(UserName, result.name),
    });
  }

  async findAll(): Promise<UserCollection> {
    const result = await this.prismaService.user.findMany();

    return new UserCollection(
      result.map(
        (e) =>
          new User({
            id: required(UserId, e.id),
            age: required(UserAge, e.age),
            name: required(UserName, e.name),
          }),
      ),
    );
  }
}
