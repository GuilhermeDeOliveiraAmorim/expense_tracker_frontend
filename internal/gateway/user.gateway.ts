import { UserRepository } from "../repository/user.repository";
import { apiRoutes } from "./api_routes";
import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from "../usecases/create_user";
import { LoginInputDTO, LoginOutputDTO } from "../usecases/login";
import { AxiosInstance } from "axios";

export class UserGateway implements UserRepository {
  constructor(private http: AxiosInstance) {}

  async createUser(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    try {
      const output = await this.http.post<CreateUserOutputDTO>(
        apiRoutes.createUser,
        input
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }

  async login(input: LoginInputDTO): Promise<LoginOutputDTO> {
    try {
      const output = await this.http.post<LoginOutputDTO>(
        apiRoutes.login,
        input
      );

      return output.data;
    } catch (error) {
      throw error;
    }
  }
}
