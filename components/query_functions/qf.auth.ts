import { UserFactory } from "@/internal/factory/user.factory";
import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from "@/internal/usecases/create_user";
import { LoginInputDTO, LoginOutputDTO } from "@/internal/usecases/login";

export const login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
  const userFactory = new UserFactory();
  const loginUseCase = userFactory.loginUseCase();
  const response = loginUseCase.execute(input);

  sessionStorage.setItem("user_id", (await response).user_id);
  sessionStorage.setItem("access_token", (await response).access_token);

  return response;
};

export const signup = async (
  input: CreateUserInputDTO
): Promise<CreateUserOutputDTO> => {
  const userFactory = new UserFactory();
  const createUserUseCase = userFactory.createUserUseCase();
  const response = createUserUseCase.execute(input);

  sessionStorage.setItem("user_id", (await response).user_id);

  return response;
};
