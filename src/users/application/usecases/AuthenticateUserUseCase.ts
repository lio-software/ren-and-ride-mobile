import UserEntity from "../../domain/entities/UserEntity";
import IUserRepositoryPort from "../ports/IUserRepositoryPort";

class AuthenticateUseCase {
  private userRepository: IUserRepositoryPort;

  constructor(userRepository: IUserRepositoryPort) {
    this.userRepository = userRepository;
  }

  async execute(email: string, password: string): Promise<UserEntity> {
    return this.userRepository.authenticate(email, password);
  }
}

export default AuthenticateUseCase;