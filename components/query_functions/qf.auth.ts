import { UserFactory } from "@/internal/factory/user.factory";
import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from "@/internal/usecases/create_user";
import { LoginInputDTO, LoginOutputDTO } from "@/internal/usecases/login";

export const login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
  try {
    const userFactory = new UserFactory();
    const loginUseCase = userFactory.loginUseCase();
    const response = await loginUseCase.execute(input);

    sessionStorage.setItem("user_id", response.user_id);
    sessionStorage.setItem("access_token", response.access_token);

    return response;
  } catch (error) {
    throw error;
  }
};

export const signup = async (
  input: CreateUserInputDTO
): Promise<CreateUserOutputDTO> => {
  try {
    const userFactory = new UserFactory();
    const createUserUseCase = userFactory.createUserUseCase();
    const response = await createUserUseCase.execute(input);

    sessionStorage.setItem("user_id", response.user_id);

    return response;
  } catch (error) {
    throw error;
  }
};
