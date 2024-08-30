import { UserRepository } from "../repository/user.repository";

export type CreateUserInputDTO = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserOutputDTO = {
  user_id: string;
};

export class CreateUserUseCase {
  constructor(private UserGateway: UserRepository) {}

  async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const output = await this.UserGateway.createUser(input);

    return output;
  }
}
