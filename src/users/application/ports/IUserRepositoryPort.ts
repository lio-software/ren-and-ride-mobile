import UserEntity from "../../domain/entities/UserEntity";

interface IUserRepositoryPort {
  authenticate(email: string, password: string): Promise<UserEntity>;
  create(firstName: string, lastName: string, email: string, password: string, phoneNumber: string): Promise<UserEntity>;
  update(user: UserEntity, id: string): Promise<UserEntity>;
}

export default IUserRepositoryPort;