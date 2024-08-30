import axios from "axios";
import { UserRepository } from "../repository/user.repository";

export type CreateUserInputDTO = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserOutputDTO = {
  user_id: string;
  message: string;
};

export class CreateUserUseCase {
  constructor(private UserGateway: UserRepository) {}

  async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    try {
      const output = await this.UserGateway.createUser(input);

      return output;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.error.detail);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
