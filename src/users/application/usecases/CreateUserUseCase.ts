import UserEntity from "../../domain/entities/UserEntity";
import IUserRepositoryPort from "../ports/IUserRepositoryPort";

class CreateUserUseCase {
  private userRepository: IUserRepositoryPort;

  constructor(userRepository: IUserRepositoryPort) {
    this.userRepository = userRepository;
  }

  async execute(firstName: string, lastName: string, email: string, password: string, phoneNumber: string): Promise<UserEntity> {
    return this.userRepository.create(firstName, lastName, email, password, phoneNumber);
  }
}

export default CreateUserUseCase;