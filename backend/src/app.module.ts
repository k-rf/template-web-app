import { Module } from "@nestjs/common";

import { UserModule } from "./example/features/user.module";
import { DatabaseModule } from "./lib/database/database.module";

@Module({
  imports: [DatabaseModule, UserModule],
})
export class AppModule {}
