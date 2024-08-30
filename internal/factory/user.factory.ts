import { UserRepository } from "../repository/user.repository";
import { CreateUserUseCase } from "../usecases/create_user";

export class UserFactory {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  createUserUseCase() {
    return new CreateUserUseCase(this.userRepository);
  }
}
