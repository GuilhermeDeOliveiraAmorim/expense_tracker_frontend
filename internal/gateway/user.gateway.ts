import { AxiosInstance } from "axios";
import { UserRepository } from "../repository/user.repository";
import { apiRoutes } from "./api_routes";
import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from "../usecases/create_user";
import { LoginInputDTO, LoginOutputDTO } from "../usecases/login";

export class UserGateway implements UserRepository {
  constructor(private http: AxiosInstance) {}

  async createUser(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const output = await this.http.post<CreateUserOutputDTO>(
      apiRoutes.createUser,
      input
    );

    return output.data;
  }

  async login(input: LoginInputDTO): Promise<LoginOutputDTO> {
    const output = await this.http.post<LoginOutputDTO>(apiRoutes.login, input);

    return output.data;
  }
}
