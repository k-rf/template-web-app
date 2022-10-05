import { Injectable } from "@nestjs/common";

import { ApplicationService } from "~/shared/application-service/application-service";

import { UserId } from "../domain/user-id";
import { UserRepository } from "../domain/user.repository";

import { GetUserInput } from "./get-user.input";
import { GetUserOutput } from "./get-user.output";

@Injectable()
export class GetUserService extends ApplicationService<GetUserInput, GetUserOutput> {
  constructor(private readonly repository: UserRepository) {
    super();
  }

  async handle(input: GetUserInput): Promise<GetUserOutput> {
    const id = new UserId(input.value.id);

    const result = await this.repository.findById(id);

    return new GetUserOutput({
      id: result.value.id.value,
      age: result.value.age.value,
      name: result.value.name.value,
    });
  }
}
