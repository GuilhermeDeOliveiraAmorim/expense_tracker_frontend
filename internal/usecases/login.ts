import axios from "axios";
import { UserRepository } from "../repository/user.repository";

export type LoginInputDTO = {
  email: string;
  password: string;
};

export type LoginOutputDTO = {
  name: string;
  user_id: string;
  access_token: string;
  success_message: string;
  content_message: string;
};

export class LoginUseCase {
  constructor(private UserGateway: UserRepository) {}

  async execute(input: LoginInputDTO): Promise<LoginOutputDTO> {
    try {
      const output = await this.UserGateway.login(input);

      return output;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
