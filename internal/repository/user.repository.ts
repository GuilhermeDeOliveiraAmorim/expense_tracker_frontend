import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from "../usecases/create_user";
import { LoginInputDTO, LoginOutputDTO } from "../usecases/login";

export interface UserRepository {
  createUser(input: CreateUserInputDTO): Promise<CreateUserOutputDTO>;
  login(input: LoginInputDTO): Promise<LoginOutputDTO>;
}
