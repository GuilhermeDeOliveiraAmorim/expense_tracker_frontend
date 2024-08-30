import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from "../usecases/create_user";

export interface UserRepository {
  createUser(input: CreateUserInputDTO): Promise<CreateUserOutputDTO>;
}
