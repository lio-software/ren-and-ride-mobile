import IUserRepositoryPort from "../ports/IUserRepositoryPort";
import UserEntity from "../../domain/entities/UserEntity";

class UpdateUserUseCase {
  private userRepository: IUserRepositoryPort;

  constructor(userRepository: IUserRepositoryPort) {
    this.userRepository = userRepository;
  }

  async execute(user: UserEntity, id: string): Promise<UserEntity> {
    return this.userRepository.update(user, id);
  }
}

export default UpdateUserUseCase;