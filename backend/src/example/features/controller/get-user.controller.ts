import { Controller, Get, Param } from "@nestjs/common";

import { GetUserInput } from "../core/service/get-user.input";
import { GetUserService } from "../core/service/get-user.service";

@Controller("user")
export class GetUserController {
  constructor(private readonly service: GetUserService) {}

  @Get(":id")
  handle(@Param() value: { id: string }) {
    console.log(value);
    return this.service.handle(new GetUserInput({ id: value.id }));
  }
}
