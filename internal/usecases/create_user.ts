import axios from "axios";
import { UserRepository } from "../repository/user.repository";

export type CreateUserInputDTO = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserOutputDTO = {
  name: string;
  success_message: string;
  content_message: string;
};

export class CreateUserUseCase {
  constructor(private UserGateway: UserRepository) {}

  async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    try {
      const output = await this.UserGateway.createUser(input);
      console.log("output", output);
      return output;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        console.log("error", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
