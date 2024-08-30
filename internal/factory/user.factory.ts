import { UserGateway } from "../gateway/user.gateway";
import { CreateUserUseCase } from "../usecases/create_user";
import { LoginUseCase } from "../usecases/login";
import { http } from "../util/http";

export class UserFactory {
  userGateway = new UserGateway(http);

  createUserUseCase() {
    return new CreateUserUseCase(this.userGateway);
  }

  loginUseCase() {
    return new LoginUseCase(this.userGateway);
  }
}
