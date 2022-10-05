import { Module } from "@nestjs/common";

import { GetUserController } from "./controller/get-user.controller";
import { UserRepository } from "./core/domain/user.repository";
import { GetUserService } from "./core/service/get-user.service";
import { UserInMemoryRepository } from "./infrastructure/user.in-memory.repository";
import { UserPrismaRepository } from "./infrastructure/user.prisma.repository";

@Module({
  controllers: [GetUserController],
  providers: [
    GetUserService,
    {
      provide: UserRepository,
      useClass: process.env.NODE_ENV === "test" ? UserInMemoryRepository : UserPrismaRepository,
    },
  ],
})
export class UserModule {}
